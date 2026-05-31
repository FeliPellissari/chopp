import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import api from '../../../../lib/api';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const accessToken = authHeader?.replace('Bearer ', '');

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NO_TOKEN',
            message: 'No access token provided',
          },
        },
        { status: 401 }
      );
    }

    // Verifica o token na API externa (simulação - a API pode ter endpoint /auth/me)
    // Por enquanto, retorna erro simples
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      },
      { status: 401 }
    );
  } catch {
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
