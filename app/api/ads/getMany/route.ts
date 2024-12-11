import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// import AdModel from '../../../src/models/adModel';
import AdModel from '@/src/models/supabase/adModel';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request:NextRequest, params: Record<string,string> ) {
  try {
    const response = await AdModel.findMany();
    
    return NextResponse.json(response.data);
  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
