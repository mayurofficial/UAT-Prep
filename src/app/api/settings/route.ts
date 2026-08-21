import { NextRequest, NextResponse } from 'next/server';
import { SecurityService } from '@/utils/security';
import { CloudDatabase } from '@/lib/db';

function getAuthenticatedUser(req: NextRequest): string | null {
  const sessionCookie = req.cookies.get('anjali_auth_session')?.value;
  if (!sessionCookie) return null;
  const payload = SecurityService.verifySessionToken(sessionCookie);
  return payload ? payload.username : null;
}

export async function GET(req: NextRequest) {
  try {
    const username = getAuthenticatedUser(req) || 'anjali';
    const key = `user:${username}:settings`;
    const settings = await CloudDatabase.get<Record<string, unknown>>(key);

    return NextResponse.json({
      success: true,
      settings: settings || {},
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to retrieve settings from cloud database.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const username = getAuthenticatedUser(req) || 'anjali';
    const body = await req.json();

    const key = `user:${username}:settings`;
    const existing = (await CloudDatabase.get<Record<string, unknown>>(key)) || {};
    const updated = { ...existing, ...body };

    await CloudDatabase.set(key, updated);

    return NextResponse.json({
      success: true,
      settings: updated,
      savedAt: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to save settings to cloud database.' },
      { status: 500 }
    );
  }
}
