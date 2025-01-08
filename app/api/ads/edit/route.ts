import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// import AdModel from '../../../src/models/adModel';
import AdModel from '@/src/models/supabase/adModel';
import TokenService from '@/src/services/tokenService';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request:NextRequest ) {
  try {
    const authorizationHeader = request.headers.get('authorization');
    console.log(authorizationHeader);
    if(!authorizationHeader){
      return NextResponse.json('No authorization header', { status: 401 });
    };

    const accessToken = authorizationHeader.split(' ')[1];
    console.log(accessToken);
    if (!accessToken) {
      return NextResponse.json('No token', { status: 401 });
    }

    const userData = await TokenService.validateAccessToken(accessToken);
    console.log(userData);
    if (!userData) {
      return NextResponse.json('Wrong token', { status: 401 });
    }

    const ad = await request.json();
    console.log(ad);
    const response = await AdModel.edit(ad);
    console.log(response);
    
    return NextResponse.json(response.data?.[0]);

  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
