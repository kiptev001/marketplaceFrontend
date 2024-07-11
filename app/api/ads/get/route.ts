import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AdModel from '../../../src/models/adModel';

export async function GET(request:NextRequest, params: Record<string,string> ) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const response = await AdModel.findMany(10);

    return NextResponse.json(response.data);

  } catch (error) {
    const dbError = error;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
