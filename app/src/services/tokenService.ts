import jwt from 'jsonwebtoken';
import TokenModel from '../../src/models/tokenModel';

class TokenService {
  generateTokens(payload) {
    console.log('PAYLOAD IN GENERATE TOKENS',payload);
    const accessToken = jwt.sign(payload, 'ACCESS SECRET', { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, 'REFRESH SECRET', { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId:number, refreshToken:string) {
    const tokenData = await TokenModel.findOneByUserId(userId);
    if (tokenData.refreshToken) {
      return TokenModel.saveToken(userId, refreshToken);
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

  // validateAccessToken(accessToken:string) {
  //   try {
  //     const decodedToken = jwt.decode(accessToken);
  //     console.log('DecodedToken:', decodedToken);
  //     const userData = jwt.verify(accessToken, 'ACCESS SECRET');
  //     return userData;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // validateRefreshToken(refreshToken:string) {
  //   try {
  //     const userData = jwt.verify(refreshToken, 'REFRESH SECRET');
  //     return userData;
  //   } catch (error) {
  //     return null;
  //   }
  // }
  validateAccessToken(accessToken: string) {
    try {
      const decodedToken = jwt.decode(accessToken);
      console.log('DecodedToken:', decodedToken);
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }
}

const service = new TokenService();

export default service;
