import jwt from 'jsonwebtoken';
import TokenModel from '../models/tokenModel';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
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

  validateAccessToken(accessToken:string) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken:string) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

const service = new TokenService();

export default service;
