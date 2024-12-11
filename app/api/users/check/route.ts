import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import TokenService from '@/src/services/tokenService';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request:NextRequest ) {
  try {
    const authorizationHeader = request.headers.get('authorization');
    if(!authorizationHeader)return NextResponse.json(null);
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return NextResponse.json(null,{ status: 401 });
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
