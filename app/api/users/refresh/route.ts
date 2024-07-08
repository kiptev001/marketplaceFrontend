import { cookies } from 'next/headers';
import UserService from '../../../src/services/userService';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request:NextRequest ) {
  try {
    const cookie = cookies().get('refreshToken');

    const userData = await UserService.refresh(cookie?.value);

    cookies().set('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    return NextResponse.json(userData);

  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
