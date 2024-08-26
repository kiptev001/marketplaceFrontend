import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import MailService from './mailService';
import tokenService from './tokenService';
// import UserModel from '../../src/models/userModel';
import UserModel from '@/app/src/models/supabase/userModel';
import { ApiError } from './apiError';
import { IUserFromDb } from '../types';

class UserService {
  async registration(email:string, password:string) {
    const responseWithCandidate = await UserModel.findOne(email);

    if (responseWithCandidate.data?.[0]) {
      throw ApiError.BadRequest('Пользователь с таким адресом электронной почты уже существует.');
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();

    const responseWithNewUser = await UserModel.create( email, hashedPassword, activationLink );

    if(responseWithNewUser?.data?.[0]){
      await MailService.sendActivationMail(email,activationLink);
    }

    const user = responseWithNewUser?.data?.[0];
    
    const tokens = await tokenService.generateTokens({ ...user });
    
    if(user){
      await tokenService.saveToken(user?.id, tokens.refreshToken);
    }

    const userDto = {
      id: user?.id,
      email: user?.email,
      isactivated: user?.isactivated,
      activationlink: user?.activationlink
    };

    return { ...tokens, user: userDto };
  }

  async login(email:string, password:string) {
    const responseWithUser = await UserModel.findOne(email);
    const user = responseWithUser?.data?.[0];

    if (!user) {
      throw ApiError.BadRequest('Incorrect email');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw ApiError.BadRequest('Incorrect password');
    }

    const userDto = {
      id: user.id,
      email: user.email,
      isactivated: user.isactivated,
      activationlink: user.activationlink
    };

    const tokens = await tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken:string) {
    const token = await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken:string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);

    const responseWithTokenFromDb = await tokenService.findToken(refreshToken);

    const tokenFromDb = responseWithTokenFromDb?.refreshtoken;
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    //@ts-ignore
    const responseWithUserDataFromDb = await UserModel.findById(userData.id);

    const userDataFromDb = responseWithUserDataFromDb?.data?.[0] as IUserFromDb;

    if (!userDataFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const { password, ...userDto } = userDataFromDb;

    const tokens = await tokenService.generateTokens({ ...userDto });
    
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.findAll();
    return users;
  }
}

const service = new UserService();

export default service;
