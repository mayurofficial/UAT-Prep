import { NextRequest, NextResponse } from 'next/server';
import { SecurityService } from '@/utils/security';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('anjali_auth_session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = SecurityService.verifySessionToken(sessionCookie);

    if (!payload) {
      // Invalid or expired token
      const response = NextResponse.json({ authenticated: false }, { status: 200 });
      response.cookies.delete('anjali_auth_session');
      return response;
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        username: payload.username,
        role: payload.role,
        displayName: 'Anjali Teacher',
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
