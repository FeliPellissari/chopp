import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import api from '../../../../lib/api';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    role: 'admin' | 'user';
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequestBody = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_CREDENTIALS',
            message: 'Email and password are required',
          },
        },
        { status: 400 }
      );
    }

    const response = await api.post('/api/auth/login', { email, password });
    const data: LoginResponseData = response.data.data;

    const cookieStore = await cookies();
    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return NextResponse.json({
      success: true,
      data: {
        accessToken: data.accessToken,
        user: data.user,
      },
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const errorWithResponse = error as { response?: { data?: unknown; status?: number } };
      return NextResponse.json(
        errorWithResponse.response?.data || {
          success: false,
          error: {
            code: 'LOGIN_ERROR',
            message: 'Authentication failed',
          },
        },
        { status: errorWithResponse.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
}
