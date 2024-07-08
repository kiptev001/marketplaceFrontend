import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiError } from './app/src/services/apiError';
import TokenService from './app/src/services/tokenService';
// TODO!!!
// ЗАМЕНИТЬ JWT НА БИБЛИОТЕКУ, КОТОРАЯ РАБОТАЕТ С EDGE RUNTIME!
export function middleware(request: NextRequest) {
  console.log('MIDDLEWARE!');
  const authorizationHeader = request.headers.get('authorization');
  console.log('AUTH HEADER', authorizationHeader);
  
  if (!authorizationHeader) {
    return NextResponse.json(ApiError.UnauthorizedError(), { status: 401 });
  }
  
  const accessToken = authorizationHeader.split(' ')[1];
  console.log('ACCESS TOKEN',accessToken);
  if (!accessToken) {
    return NextResponse.json(ApiError.UnauthorizedError(), { status: 401 });
  }

  const userData = TokenService.validateAccessToken(accessToken);
  console.log('USERDATA=',userData);
  if (!userData) {
    return NextResponse.json(ApiError.UnauthorizedError(), { status: 401 });
  }

  request.headers.set('user', JSON.stringify(userData));

  return NextResponse.next();
}

export const config = {
  matcher: '/api/users/getUser',
};
