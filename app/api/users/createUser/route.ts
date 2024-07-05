import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import UserModel from '../../models/userModel';
import MailService from '../../services/mailService';
import UserService from '../../services/userService';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const {accessToken,refreshToken,user} = await UserService.registration(email,password);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    const dbError = error as DatabaseError;

    if (dbError.code === '23505') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
