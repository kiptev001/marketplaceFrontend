import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

interface DatabaseError extends Error {
  code?: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();

    const result = await sql`
      INSERT INTO users (email, password, activationLink)
      VALUES (${email}, ${hashedPassword}, ${activationLink})
      RETURNING *;
    `;

    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    const dbError = error as DatabaseError;

    if (dbError.code === '23505') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
