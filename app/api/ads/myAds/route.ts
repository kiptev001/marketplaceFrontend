import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AdModel from '@/app/src/models/supabase/adModel';
import TokenService from '@/app/src/services/tokenService';
import { IUser } from '@/app/src/types';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request:NextRequest, params: Record<string,string> ) {
  const authorizationHeader = request.headers.get('authorization');
  if(!authorizationHeader){
    return NextResponse.json('No authorization header', { status: 401 });
  };

  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    return NextResponse.json('No token', { status: 401 });
  }

  const userData = await TokenService.validateAccessToken(accessToken);
  if (!userData) {
    return NextResponse.json('Wrong token', { status: 401 });
  }
  //@ts-expect-error
  const response = await AdModel.findByUserId(userData.id);

  return NextResponse.json(response.data);
}
