import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserTutorialDto } from './dto/update-tutorial-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
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

    return this.userModel.create({
      ...createUserDto,
      username: createUserDto.email.toLowerCase(),
      creationDate: new Date(),
      _id: userId,
      id: userId.toHexString(),
      hashedPassword,
      code,
    });
  }
  /**
   * Load the given _id
   */
  async getUserById(id: string): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }
  /**
   * Update user by id
   */
  async update(id: string, update: UpdateUserDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate(
        { _id: this.oidFrom(id) },
        {
          $set: update,
        },
      )
      .exec();
  }
  /**
   * Deletes an existing user
   */
  async removeUser(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({ id }).exec();
  }
  /**
   * Verify the user email by the given code
   */
  async verifyEmail(code: string): Promise<User> {
    // Look up for the user by the given code
    const { _id } = await this.userModel.findOne({ code }).exec();

    // Once found, remove the verification code to clean up the user and verify the email
    return this.userModel
      .findByIdAndUpdate(
        { _id: this.oidFrom(_id) },
        { $set: { code: null, codeDate: null, emailPrev: null } },
      )
      .exec();
  }
  /**
   * Updates current users tutorial state
   */
  async updateTutorial(
    userId: string,
    update: UpdateUserTutorialDto,
  ): Promise<User> {
    const { property, value } = update;
    return this.userModel
      .findByIdAndUpdate(
        { _id: this.oidFrom(userId) },
        { $set: { [`tutorial.${property}`]: value } },
      )
      .exec();
  }
  /**
   * Updates current users password
   */
  async password(
    userId: string,
    updatePassword: UpdatePasswordDto,
  ): Promise<User> {
    const { currentPassword, newPassword, hashedPassword } = updatePassword;
    if (!currentPassword || !newPassword) {
      throw new BadRequestException({
        code: 404,
        message: 'Contraseña no ingresada',
      });
    }

    // If the user already has password
    const currentEncrypted = UserService.encrypt(currentPassword);

    if (hashedPassword !== currentEncrypted) {
      throw new BadRequestException({
        code: 403,
        message: 'Contraseña incorrecta',
      });
    }
    const _id = this.oidFrom(userId);

    return this.userModel
      .findByIdAndUpdate(
        { _id },
        { $set: { hashedPassword: UserService.encrypt(newPassword) } },
      )
      .exec();
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
}
