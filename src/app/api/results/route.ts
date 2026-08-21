import { NextRequest, NextResponse } from 'next/server';
import { SecurityService } from '@/utils/security';
import { CloudDatabase } from '@/lib/db';
import { ExamResults } from '@/types/utet';

function getAuthenticatedUser(req: NextRequest): string | null {
  const sessionCookie = req.cookies.get('anjali_auth_session')?.value;
  if (!sessionCookie) return null;
  const payload = SecurityService.verifySessionToken(sessionCookie);
  return payload ? payload.username : null;
}

export async function GET(req: NextRequest) {
  try {
    const username = getAuthenticatedUser(req) || 'anjali';
    const key = `user:${username}:results:history`;
    const history = await CloudDatabase.get<ExamResults[]>(key);

    return NextResponse.json({
      success: true,
      history: history || [],
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to retrieve exam history from cloud database.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const username = getAuthenticatedUser(req) || 'anjali';
    const body = await req.json();
    const { result } = body;

    if (!result) {
      return NextResponse.json({ error: 'Result payload is required.' }, { status: 400 });
    }

    const key = `user:${username}:results:history`;
    const existing = (await CloudDatabase.get<ExamResults[]>(key)) || [];
    const updated = [result, ...existing].slice(0, 50); // Keep last 50 attempts

    await CloudDatabase.set(key, updated);

    return NextResponse.json({
      success: true,
      savedAt: Date.now(),
      totalAttempts: updated.length,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to save exam results to cloud database.' },
      { status: 500 }
    );
  }
}
