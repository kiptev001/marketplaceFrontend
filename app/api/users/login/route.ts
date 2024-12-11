import { cookies } from 'next/headers';
import UserService from '../../../../src/services/userService';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request:NextRequest ) {
  try {
    const { email, password } = await request.json();

    const userData = await UserService.login(email,password);

    cookies().set({
      name: 'refreshToken',
      value: userData.refreshToken,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return NextResponse.json(userData);

  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
