import { NextResponse } from 'next/server';
import tokenModel from '@/app/src/models/supabase/tokenModel';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const dbResponse = await tokenModel.deleteOne('Token');

    return NextResponse.json(dbResponse);
  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
