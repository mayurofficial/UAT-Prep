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
    const { searchParams } = new URL(req.url);
    const paperId = searchParams.get('paperId') || 'utet_2025';

    const key = `user:${username}:progress:${paperId}`;
    const states = await CloudDatabase.get<Record<string, unknown>>(key);

    return NextResponse.json({
      success: true,
      paperId,
      states: states || {},
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to retrieve progress from cloud database.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const username = getAuthenticatedUser(req) || 'anjali';
    const body = await req.json();
    const { paperId, states } = body;

    if (!paperId || !states) {
      return NextResponse.json(
        { error: 'paperId and states are required.' },
        { status: 400 }
      );
    }

    const key = `user:${username}:progress:${paperId}`;
    await CloudDatabase.set(key, states);

    return NextResponse.json({
      success: true,
      paperId,
      savedAt: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to save progress to cloud database.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const username = getAuthenticatedUser(req) || 'anjali';
    const { searchParams } = new URL(req.url);
    const paperId = searchParams.get('paperId') || 'utet_2025';

    const key = `user:${username}:progress:${paperId}`;
    await CloudDatabase.delete(key);

    return NextResponse.json({
      success: true,
      paperId,
      message: 'Progress cleared.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to clear progress.' },
      { status: 500 }
    );
  }
}
