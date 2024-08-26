import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// import AdModel from '../../../src/models/adModel';
import AdModel from '@/app/src/models/supabase/adModel';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request:NextRequest, params: Record<string,string> ) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');

    if(!id){
      return NextResponse.json('Ad not found',{ status: 404 });
    }

    const response = await AdModel.findOneById(id);

    return NextResponse.json(response.data?.[0]);

  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
