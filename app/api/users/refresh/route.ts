import { cookies } from 'next/headers';
import UserService from '../../../src/services/userService';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request:NextRequest ) {
  try {
    const cookie = cookies().get('refreshToken');
    if(!cookie)return NextResponse.redirect(process.env.CLIENT_URL || '/');
    const userData = await UserService.refresh(cookie?.value);
    //@ts-ignore
    cookies().set('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    return NextResponse.json(userData,{ status:200 });

  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
