import { cookies } from 'next/headers';
import UserService from '../../../../src/services/userService';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request:NextRequest ) {
  try {
    const cookie = cookies().get('refreshToken');

    if(!cookie?.value){
      return NextResponse.json({ error: 'No refresh token' }, { status: 500 });
    }

    await UserService.logout(cookie?.value);

    cookies().delete('refreshToken');

    return NextResponse.json(null,{ status: 200 });

  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
