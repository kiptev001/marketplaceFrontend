// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
// import tokenModel from '@/app/src/models/supabase/tokenModel';

// interface DatabaseError extends Error {
//   code?: string;
// }

// export async function GET(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const query = url.searchParams.get('query');
//     // const dbResponse = await tokenModel.create(query,'token');
//     // const dbResponse = await tokenModel.findOneByUserId(query);
//     const dbResponse = await tokenModel.findOne('token');

//     return NextResponse.json(dbResponse);
//   } catch (error) {
//     const dbError = error as DatabaseError;
//     return NextResponse.json({ error: dbError.message }, { status: 500 });
//   }
// }
