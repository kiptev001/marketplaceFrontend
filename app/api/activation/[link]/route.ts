import { NextResponse } from 'next/server';
import UserModel from '../../../src/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApiError } from '../../../src/services/apiError';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(req: NextApiRequest, params: Record<string,string>) {
  try {
    const activationLink = params.params.link;

    if (!activationLink) {
      return NextResponse.json({ error: 'Activation link is missing' }, { status: 400 });
    }

    const response = await UserModel.activate(activationLink);

    if(response.status !== 200){
      throw ApiError.BadRequest('Incorrect activation link');
    }

    return NextResponse.redirect(process.env.CLIENT_URL);
  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
