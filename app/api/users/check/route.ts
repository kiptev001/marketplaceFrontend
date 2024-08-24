import { cookies } from 'next/headers';
import UserService from '../../../src/services/userService';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ApiError } from '@/app/src/services/apiError';
import TokenService from '@/app/src/services/tokenService';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request:NextRequest ) {
  try {
    const authorizationHeader = request.headers.get('authorization');
    if(!authorizationHeader)return NextResponse.json(null);
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return NextResponse.json(null);
    }
    const userData = await TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
