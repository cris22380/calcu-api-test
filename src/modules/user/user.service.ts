import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserTutorialDto } from './dto/update-tutorial-user-dto';
import { User } from './interfaces/user.interface';
import * as crypto from 'crypto';

// esto es para prueba en dev
const config = {
  salt: 'Stay hungry, stay foolish.',
};

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  /**
   * Register a new User
   */
  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password } = createUserDto;
      const isEmailUsed = await this.userModel.findOne(
        { email },
        { verified: true },
      );
      if (isEmailUsed) {
        throw new BadRequestException('Email most be unique.');
      }
      const userId = new Types.ObjectId();

      const hashedPassword = UserService.encrypt(password);

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
  /**
   * Load the given _id
   */
  async getUserById(id: string): Promise<User> {
    try {
      const userById = await this.userModel.findOne({ id }).exec();
      return this.buildUserInfo(userById);
    } catch (error) {
      return error;
    }
  }
  /**
   * Update user by id
   */
  async update(id: string, update: UpdateUserDto): Promise<User> {
    try {
      const userUpdated = await this.userModel
        .findOneAndUpdate(
          { _id: this.oidFrom(id) },
          {
            $set: update,
          },
        )
        .exec();
      return this.buildUpdateInfo({ userId: userUpdated.id, ...update });
    } catch (error) {
      return error;
    }
  }
  /**
   * Deletes an existing user
   */
  async removeUser(id: string): Promise<User> {
    try {
      const removed = await this.userModel.findOneAndDelete({ id }).exec();
      return this.buildDeletedInfo(removed);
    } catch (error) {
      return error;
    }
  }
  /**
   * Verify the user email by the given code
   */
  async verifyEmail(code: string): Promise<User> {
    try {
      // Look up for the user by the given code
      const { _id } = await this.userModel.findOne({ code }).exec();

      // Once found, remove the verification code to clean up the user and verify the email
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          { _id: this.oidFrom(_id) },
          { $set: { code: null, codeDate: null, emailPrev: null } },
        )
        .exec();

      return this.buildUserInfo(updatedUser);
    } catch (error) {
      return error;
    }
  }
  /**
   * Updates current users tutorial state
   */
  async updateTutorial(
    userId: string,
    update: UpdateUserTutorialDto,
  ): Promise<User> {
    try {
      const { property, value } = update;
      const tutorialUpdated = await this.userModel
        .findByIdAndUpdate(
          { _id: this.oidFrom(userId) },
          { $set: { [`tutorial.${property}`]: value } },
        )
        .exec();
      return this.buildUpdateInfo({
        userId: tutorialUpdated.id,
        tutorial: { [property]: value },
      });
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

  private oidFrom(src: string | ObjectId) {
    if (typeof src === 'string') {
      return new Types.ObjectId(src);
    }
    return src;
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
