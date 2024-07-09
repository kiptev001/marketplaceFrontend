import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AdModel from '../../../src/models/adModel';

export async function POST(request:NextRequest ) {
  try {
    const ad = await request.json();
    const response = await AdModel.create(ad);

    return NextResponse.json(response);

  } catch (error) {
    const dbError = error;

    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
