import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import AdModel from '../../../src/models/adModel';
import TokenService from '@/app/src/services/tokenService';
import { ApiError } from '@/app/src/services/apiError';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const response = await AdModel.search(query);
    console.log('MODEL RESPONSE = ',response);
    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 404 });
    }

    return NextResponse.json(response.data);

  } catch (error) {
    const dbError = error as DatabaseError;
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }
}
