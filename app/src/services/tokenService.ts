import TokenModel from '../../src/models/tokenModel';
import * as jose from 'jose';

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
    const tokenData = await TokenModel.findOneByUserId(userId);
    if (tokenData.refreshToken) {
      const { refreshToken: newToken } = await TokenModel.saveToken(userId, refreshToken);
      return newToken;
    }
    const token = await TokenModel.create( userId, refreshToken );
    return token;
  }

  async removeToken(refreshToken:string) {
    const tokenData = await TokenModel.deleteOne(refreshToken);
    return tokenData;
  }

  async findToken(refreshToken:string) {
    const tokenData = await TokenModel.findOne(refreshToken);
    return tokenData;
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
