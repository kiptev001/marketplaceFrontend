import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import MailService from './mailService';
import tokenService from './tokenService';
import UserModel from '../models/userModel';
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

    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  // async activate(activationLink:string) {
  //   const user = await UserModel.findOne( activationLink );
  //   if (!user) {
  //     throw ApiError.BadRequest('Incorrect activation link');
  //   }
  //   user.isActivated = true;
  //   user.save();
  // }

  // async login(email, password) {
  //   const user = await userModel.findOne({ email });
  //   if (!user) {
  //     throw ApiError.BadRequest('Incorrect email');
  //   }
  //   const isPasswordCorrect = bcrypt.compare(password, user.password);
  //   if (!isPasswordCorrect) {
  //     throw ApiError.BadRequest('Incorrect password');
  //   }
  //   const userDto = new UserDto(user);

  //   const tokens = tokenService.generateTokens({ ...userDto });
  //   await tokenService.saveToken(userDto.id, tokens.refreshToken);

  //   return { ...tokens, user: userDto };
  // }

  // async logout(refreshToken) {
  //   const token = await tokenService.removeToken(refreshToken);
  //   return token;
  // }

  // async refresh(refreshToken) {
  //   if (!refreshToken) {
  //     return ApiError.UnauthorizedError();
  //   }
  //   const userData = tokenService.validateRefreshToken(refreshToken);
  //   const tokenFromDb = await tokenService.findToken(refreshToken);
  //   if (!userData || !tokenFromDb) {
  //     return ApiError.UnauthorizedError();
  //   }
  //   const userDataFromDb = await userModel.findById(userData.id);
  //   const userDto = new UserDto(userDataFromDb);
  //   const tokens = tokenService.generateTokens({ ...userDto });
  //   await tokenService.saveToken(userDto.id, tokens.refreshToken);

  //   return { ...tokens, user: userDto };
  // }

  // async getAllUsers() {
  //   const users = await userModel.find();
  //   return users;
  // }
}

const service = new UserService();

export default service;
