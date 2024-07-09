import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiError } from './app/src/services/apiError';
import TokenService from './app/src/services/tokenService';

export function middleware(request: NextRequest) {
  const authorizationHeader = request.headers.get('authorization');
  
  if (!authorizationHeader) {
    return NextResponse.json(ApiError.UnauthorizedError(), { status: 401 });
  }
  
  const accessToken = authorizationHeader.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json(ApiError.UnauthorizedError(), { status: 401 });
  }

  const userData = TokenService.validateAccessToken(accessToken);

  if (!userData) {
    return NextResponse.json(ApiError.UnauthorizedError(), { status: 401 });
  }

  request.headers.set('user', JSON.stringify(userData));

  return NextResponse.next();
}

export const config = {
  matcher: '/api/users/getUser',
};
