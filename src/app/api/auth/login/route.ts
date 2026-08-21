import { NextRequest, NextResponse } from 'next/server';
import { SecurityService } from '@/utils/security';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, password, rememberMe } = body;

    // Extract client IP for rate limiting (supports Netlify / proxy headers)
    const clientIp =
      req.headers.get('x-nf-client-connection-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown-client';

    const rateLimitKey = `${clientIp}:${(username || '').toLowerCase()}`;

    // 1. Check Brute-Force Rate Limiting
    const rateStatus = SecurityService.checkRateLimit(rateLimitKey);
    if (!rateStatus.allowed) {
      const minutes = Math.ceil(rateStatus.retryAfterSeconds / 60);
      return NextResponse.json(
        {
          error: `Security Lockout: Too many failed login attempts. Please try again in ${minutes} minute(s).`,
          locked: true,
          retryAfter: rateStatus.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // 2. Timing-Safe Credential Verification
    const isValid = SecurityService.verifyCredentials(username, password);

    if (!isValid) {
      const failStatus = SecurityService.recordFailedAttempt(rateLimitKey);
      if (failStatus.isLocked) {
        return NextResponse.json(
          {
            error: 'Account locked for 15 minutes due to 5 consecutive failed attempts.',
            locked: true,
            retryAfter: failStatus.retryAfterSeconds,
          },
          { status: 429 }
        );
      }

      const remaining = MAX_ATTEMPTS_CALC(rateLimitKey);
      return NextResponse.json(
        {
          error: `Invalid credentials. ${remaining} attempt(s) remaining before security lockout.`,
          remainingAttempts: remaining,
        },
        { status: 401 }
      );
    }

    // 3. Successful Authentication -> Reset Rate Limiter
    SecurityService.resetRateLimit(rateLimitKey);

    // 4. Create Cryptographically Signed Session Token
    const token = SecurityService.createSessionToken(username, 'educator');

    // 5. Construct Secure Cookie
    const maxAge = rememberMe ? 30 * 24 * 3600 : 7 * 24 * 3600; // 30 days or 7 days
    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      user: {
        username: username.toLowerCase(),
        role: 'educator',
        displayName: 'Anjali Teacher',
      },
    });

    response.cookies.set({
      name: 'anjali_auth_session',
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}

function MAX_ATTEMPTS_CALC(key: string): number {
  const status = SecurityService.checkRateLimit(key);
  return status.remainingAttempts;
}
