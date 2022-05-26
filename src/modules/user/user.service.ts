import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import * as crypto from 'crypto';

// esto es para prueba en dev
const config = {
  salt: 'Stay hungry, stay foolish.',
};

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userId = new Types.ObjectId();

      const hashedPassword = UserService.encrypt(createUserDto.password);

      await this.isEmailUnique(createUserDto.email);

      const code = crypto.pseudoRandomBytes(16).toString('hex');

      const user = await this.userModel.create({
        ...createUserDto,
        username: createUserDto.email.toLowerCase(),
        creationDate: new Date(),
        _id: userId,
        id: userId.toHexString(),
        hashedPassword,
        code,
      });
      return this.buildUserInfo(user);
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const userById = await this.userModel.findOne({ id }).exec();
      return this.buildUserInfo(userById);
    } catch (error) {
      return error;
    }
  }

  async update(id: string, update: UpdateUserDto): Promise<User> {
    try {
      const userUpdated = await this.userModel
        .findOneAndUpdate(
          { id },
          {
            $set: update,
          },
        )
        .exec();
      return this.buildUpdateInfo({ id: userUpdated.id, ...update });
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.userModel.findOneAndDelete({ id }).exec();
      return this.buildDeletedInfo(removed);
    } catch (error) {
      return error;
    }
  }

  /**
   * Encrypts the password using env salt
   * @param pass
   */
  static encrypt(password) {
    if (!password) return '';
    return crypto
      .createHmac('sha1', config.salt)
      .update(password)
      .digest('hex');
  }

  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email, verified: true });
    if (user) {
      throw new BadRequestException('Email most be unique.');
    }
  }

  private buildUpdateInfo(user): any {
    return user;
  }

  private buildDeletedInfo(user): any {
    return { userDeleted: true, id: user.id };
  }

  private buildUserInfo(user): any {
    const userRegistrationInfo = {
      email: user.email,
      first: user.first,
      last: user.last,
      location: user.location,
      locale: user.locale,
      tutorial: user.tutorial,
      isBusiness: user.isBusiness,
      roles: user.roles,
      collapsed: user.collapsed,
      emailPrev: user.emailPrev,
      id: user.id,
    };
    return userRegistrationInfo;
  }
}
