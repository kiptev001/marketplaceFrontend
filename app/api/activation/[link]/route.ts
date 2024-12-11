import { NextRequest, NextResponse } from 'next/server';
// Vercel PG DB
// import UserModel from '../../../src/models/userModel';
// Supabase PG DB
import UserModel from '@/src/models/supabase/userModel';
import { ApiError } from '../../../../src/services/apiError';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(req: NextRequest, { params }: { params: { link: string } }) {
  try {
    const activationLink = params.link;

    if (!activationLink) {
      return NextResponse.json({ error: 'Activation link is missing' }, { status: 400 });
    }

    const response = await UserModel.activate(activationLink);

    if(response.status !== 204){
      return NextResponse.json({ error: 'Incorrect activation link' },{ status: 400 });
    }

    return NextResponse.redirect(process.env.CLIENT_URL || '/');
  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
