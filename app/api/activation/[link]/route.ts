import { NextRequest, NextResponse } from 'next/server';
import UserModel from '../../../src/models/userModel';
import { ApiError } from '../../../src/services/apiError';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(req: NextRequest, { params }: { params: { link: string } }) {
  try {
    const activationLink = params.link;
    const newYork = 1;
    const newYork2 = 2;
    if (!activationLink) {
      return NextResponse.json({ error: 'Activation link is missing' }, { status: 400 });
    }

    const response = await UserModel.activate(activationLink);

    if(response.status !== 200){
      throw ApiError.BadRequest('Incorrect activation link');
    }

    return NextResponse.redirect(process.env.CLIENT_URL || '/');
  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
