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

    const userData = await UserService.registration(email,password);

    cookies().set({
      name: 'refreshToken',
      value: userData.refreshToken,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return NextResponse.json(userData);

  } catch (error) {
    const dbError = error as DatabaseError;

    if (dbError.code === '23505') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
