import { Injectable } from '@nestjs/common';
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
    const verifyEmail = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (verifyEmail) {
      throw new Error('email already used');
    }
    const userId = new Types.ObjectId();

    const hashedPassword = this.encrypt(createUserDto.password);

    const code = crypto.pseudoRandomBytes(16).toString('hex');

    return await this.userModel.create({
      ...createUserDto,
      username: createUserDto.email.toLowerCase(),
      creationDate: new Date(),
      _id: userId,
      id: userId.toHexString(),
      hashedPassword,
      code,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  async update(id: string, update: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findOneAndUpdate(
        { id },
        {
          $set: update,
        },
      )
      .exec();
  }

  async remove(id: string) {
    return await this.userModel.findOneAndDelete({ id }).exec();
  }

  /**
   * Encrypts the password using env salt
   * @param pass
   */
  encrypt(password) {
    if (!password) return '';
    return crypto
      .createHmac('sha1', config.salt)
      .update(password)
      .digest('hex');
  }
}
