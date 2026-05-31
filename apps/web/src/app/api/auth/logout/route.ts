import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import api from '../../../../lib/api';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (refreshToken) {
      try {
        await api.post('/api/auth/logout', { refreshToken });
      } catch {
        // Ignora erro na API externa, ainda assim limpa o cookie
      }
    }

    cookieStore.delete('refreshToken');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'LOGOUT_ERROR',
          message: 'Failed to logout',
        },
      },
      { status: 500 }
    );
  }
}
