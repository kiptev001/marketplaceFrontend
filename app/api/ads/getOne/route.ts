import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AdModel from '../../../src/models/adModel';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request:NextRequest, params: Record<string,string> ) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    const response = await AdModel.findOneById(id);

    return NextResponse.json(response.data);

  } catch (error) {
    const dbError = error as DatabaseError;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
