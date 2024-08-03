import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AdModel from '../../../src/models/adModel';
import TokenService from '@/app/src/services/tokenService';
import { ApiError } from '@/app/src/services/apiError';

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
    const ad = await request.json();
    const response = await AdModel.create({...ad, userid:userData.id});

    return NextResponse.json(response);

  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
