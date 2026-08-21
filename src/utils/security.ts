import crypto from 'crypto';

// Secret key for HMAC token signing (configurable via Netlify env variables or .env.local)
const AUTH_SECRET = process.env.AUTH_SECRET || 'anjali-teacher-hub-secure-auth-secret-key-2025-v1-super-secure';

// Authorized teacher credentials (configurable via Netlify env variables or .env.local)
const DEFAULT_USERNAME = (process.env.TEACHER_USERNAME || 'anjali').trim().toLowerCase();
const DEFAULT_PASSWORD = (process.env.TEACHER_PASSWORD || 'teacher@2025').trim();

// Salted SHA-256 / PBKDF2 hash of default password
const PASSWORD_SALT = 'anjali_salt_987x_secure_2025';
function hashPassword(pwd: string): string {
  return crypto.pbkdf2Sync(pwd, PASSWORD_SALT, 10000, 32, 'sha256').toString('hex');
}

const AUTHORIZED_HASH = hashPassword(DEFAULT_PASSWORD);

// In-Memory Rate Limiter & Brute-force Shield
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number | null;
  lastAttempt: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

export interface SessionPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
  nonce: string;
}

export const SecurityService = {
  /**
   * Checks rate limiting for an identifier (IP address or Username)
   */
  checkRateLimit(key: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds: number } {
    const now = Date.now();
    const record = loginAttempts.get(key);

    if (!record) {
      return { allowed: true, remainingAttempts: MAX_ATTEMPTS, retryAfterSeconds: 0 };
    }

    // If locked out, check if lock expired
    if (record.lockedUntil && now < record.lockedUntil) {
      const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
    }

    // Reset if last attempt was older than lockout window
    if (now - record.lastAttempt > LOCKOUT_MS) {
      loginAttempts.delete(key);
      return { allowed: true, remainingAttempts: MAX_ATTEMPTS, retryAfterSeconds: 0 };
    }

    const remaining = Math.max(0, MAX_ATTEMPTS - record.attempts);
    return { allowed: remaining > 0, remainingAttempts: remaining, retryAfterSeconds: 0 };
  },

  /**
   * Records a failed attempt and triggers lockout if max attempts exceeded
   */
  recordFailedAttempt(key: string): { isLocked: boolean; retryAfterSeconds: number } {
    const now = Date.now();
    const record = loginAttempts.get(key) || { attempts: 0, lockedUntil: null, lastAttempt: now };

    record.attempts += 1;
    record.lastAttempt = now;

    if (record.attempts >= MAX_ATTEMPTS) {
      record.lockedUntil = now + LOCKOUT_MS;
      loginAttempts.set(key, record);
      return { isLocked: true, retryAfterSeconds: Math.ceil(LOCKOUT_MS / 1000) };
    }

    loginAttempts.set(key, record);
    return { isLocked: false, retryAfterSeconds: 0 };
  },

  /**
   * Resets rate limiter on successful authentication
   */
  resetRateLimit(key: string): void {
    loginAttempts.delete(key);
  },

  /**
   * Timing-Safe Verification of Credentials
   */
  verifyCredentials(username: string, password: string): boolean {
    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (u !== DEFAULT_USERNAME && u !== 'teacher') {
      return false;
    }

    const computedHash = hashPassword(p);
    const expectedBuffer = Buffer.from(AUTHORIZED_HASH, 'hex');
    const actualBuffer = Buffer.from(computedHash, 'hex');

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  },

  /**
   * Creates a signed HMAC-SHA256 session token (7 days expiry)
   */
  createSessionToken(username: string, role = 'educator'): string {
    const now = Math.floor(Date.now() / 1000);
    const payload: SessionPayload = {
      username: username.toLowerCase(),
      role,
      iat: now,
      exp: now + 7 * 24 * 3600, // 7 days
      nonce: crypto.randomBytes(16).toString('hex'),
    };

    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', AUTH_SECRET).update(payloadB64).digest('base64url');

    return `${payloadB64}.${signature}`;
  },

  /**
   * Validates and decodes signed session token
   */
  verifySessionToken(token: string): SessionPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 2) return null;

      const [payloadB64, signature] = parts;
      const expectedSignature = crypto.createHmac('sha256', AUTH_SECRET).update(payloadB64).digest('base64url');

      const expectedBuf = Buffer.from(expectedSignature);
      const actualBuf = Buffer.from(signature);

      if (expectedBuf.length !== actualBuf.length || !crypto.timingSafeEqual(expectedBuf, actualBuf)) {
        return null;
      }

      const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as SessionPayload;
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp < now) {
        return null; // Expired
      }

      return payload;
    } catch {
      return null;
    }
  },
};
