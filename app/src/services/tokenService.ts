// import TokenModel from '../../src/models/tokenModel';
import TokenModel from '@/app/src/models/supabase/tokenModel';
import * as jose from 'jose';
import { IUser } from '../types';

class TokenService {
  async generateTokens(payload:Record<string,unknown> ) {
    const accessToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('90m')
      .sign(new TextEncoder().encode(process.env.JWT_ACCESS_SECRET));

    const refreshToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30d')
      .sign(new TextEncoder().encode(process.env.JWT_REFRESH_SECRET));

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId:number, refreshToken:string) {
    const responseWithExistingToken = await TokenModel.findOneByUserId(userId);
    const refreshTokenFromDb = responseWithExistingToken.data?.[0];

    if (refreshTokenFromDb) {
      const responseWithNewToken = await TokenModel.saveToken(userId, refreshToken);
      const newToken = responseWithNewToken.data?.[0].refreshtoken;
      return newToken;
    }

    const responseWithNewToken = await TokenModel.create( userId, refreshToken );
    const newToken = responseWithNewToken.data?.[0].refreshtoken;
    return newToken;
  }

  async removeToken(refreshToken:string) {
    await TokenModel.deleteOne(refreshToken);
  }

  async findToken(refreshToken:string) {
    const responseWithToken = await TokenModel.findOne(refreshToken);
    const refreshTokenFromDb = responseWithToken.data?.[0];
    if(refreshTokenFromDb)return refreshTokenFromDb;
    return null;
  }

  async validateAccessToken(accessToken:string) {
    try {
      const { payload } = await jose.jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
      );
      return payload;
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }

  async validateRefreshToken(refreshToken:string) {
    try {
      const { payload } = await jose.jwtVerify(
        refreshToken,
        new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)
      );
      return payload;
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }

}

const service = new TokenService();

export default service;
