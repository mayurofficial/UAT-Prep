import { getStore } from '@netlify/blobs';
import fs from 'fs';
import path from 'path';

const STORE_NAME = 'anjali-teacher-hub';

// Local disk persistence fallback for local development outside Netlify
const LOCAL_STORE_DIR = path.join(process.cwd(), '.cache');
const LOCAL_STORE_FILE = path.join(LOCAL_STORE_DIR, 'anjali_data_store.json');

function readLocalStore(): Record<string, unknown> {
  try {
    if (!fs.existsSync(LOCAL_STORE_DIR)) {
      fs.mkdirSync(LOCAL_STORE_DIR, { recursive: true });
    }
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_STORE_FILE, 'utf8'));
    }
  } catch {
    // Ignore read errors
  }
  return {};
}

function writeLocalStore(data: Record<string, unknown>): void {
  try {
    if (!fs.existsSync(LOCAL_STORE_DIR)) {
      fs.mkdirSync(LOCAL_STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // Ignore write errors
  }
}

export const CloudDatabase = {
  /**
   * Retrieves a JSON object by key from Netlify Blobs with local fallback
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      // 1. Try Netlify Blobs if in Netlify environment
      if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY_API_TOKEN) {
        const store = getStore({ name: STORE_NAME, consistency: 'strong' });
        const val = await store.get(key, { type: 'json' });
        if (val !== null && val !== undefined) {
          return val as T;
        }
      }
    } catch {
      // Fallback to local store
    }

    // 2. Local fallback
    const localData = readLocalStore();
    return (localData[key] as T) || null;
  },

  /**
   * Sets a JSON object by key in Netlify Blobs with local fallback
   */
  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      // 1. Try Netlify Blobs
      if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY_API_TOKEN) {
        const store = getStore({ name: STORE_NAME, consistency: 'strong' });
        await store.setJSON(key, value);
      }
    } catch {
      // Fallback to local store
    }

    // 2. Also persist to local store
    const localData = readLocalStore();
    localData[key] = value;
    writeLocalStore(localData);
    return true;
  },

  /**
   * Deletes a key
   */
  async delete(key: string): Promise<boolean> {
    try {
      if (process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY_API_TOKEN) {
        const store = getStore({ name: STORE_NAME });
        await store.delete(key);
      }
    } catch {}

    const localData = readLocalStore();
    delete localData[key];
    writeLocalStore(localData);
    return true;
  },
};
