import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import MailService from './mailService';
import tokenService from './tokenService';
import UserModel from '../../src/models/userModel';
import { ApiError } from './apiError';

class UserService {
  async registration(email:string, password:string) {
    const candidate = await UserModel.findOne(email);

    if (candidate.user) {
      throw ApiError.BadRequest('User with this email is already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();
    const {user} = await UserModel.create( email, hashedPassword, activationLink );

    await MailService.sendActivationMail(email,activationLink);

    const tokens = await tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    const userDto = {
      id: user.id,
      email: user.email,
      isactivated: user.isactivated,
      activationlink: user.activationlink
    };

    return { ...tokens, user:userDto };
  }

  async login(email:string, password:string) {
    const {user, status} = await UserModel.findOne( email );
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
    return token;
  }

  async refresh(refreshToken:string) {
    if (!refreshToken) {
      return ApiError.UnauthorizedError();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      return ApiError.UnauthorizedError();
    }
    //@ts-ignore
    const {user:userDataFromDb } = await UserModel.findById(userData.id);
    //@ts-ignore
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
