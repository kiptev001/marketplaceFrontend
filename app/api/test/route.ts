import tokenModel from '@/app/src/models/supabase/tokenModel';
import { NextResponse } from 'next/server';
import AdModel from '@/app/src/models/supabase/adModel';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const dbResponse = await AdModel.search('вен');

    return NextResponse.json(dbResponse);
  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
