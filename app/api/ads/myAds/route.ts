import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AdModel from '@/src/models/supabase/adModel';
import TokenService from '@/src/services/tokenService';

export async function GET(request:NextRequest, params: Record<string,string> ) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  if(!refreshToken){
    return NextResponse.json('No token', { status: 401 });
  }
  const userData = await TokenService.validateRefreshToken(refreshToken);
  if (!userData) {
    return NextResponse.json('Wrong token', { status: 401 });
  }
  //@ts-expect-error
  const response = await AdModel.findByUserId(userData.id);

  return NextResponse.json(response.data);
}
