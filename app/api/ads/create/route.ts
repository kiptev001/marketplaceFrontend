import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// import AdModel from '../../../src/models/adModel';
import AdModel from '@/app/src/models/supabase/adModel';
import TokenService from '@/app/src/services/tokenService';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request:NextRequest ) {
  try {
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

    const ad = await request.json();
    const response = await AdModel.create({ ...ad, userid: userData.id });
    
    return NextResponse.json(response.data?.[0]);

  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
