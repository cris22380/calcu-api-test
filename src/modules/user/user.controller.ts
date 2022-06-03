import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserTutorialDto } from './dto/update-tutorial-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { PasswordRequestUserDto } from './dto/password-request-user.dto';
import { UserResponse } from './transformers/userResponse';
import { UpdateUserResponse } from './transformers/upadateUserResponse';
import { DeleteUserResponse } from './transformers/deleteUserResponse';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.register(createUserDto);
    return plainToInstance(UserResponse, newUser.toJSON(), {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return plainToInstance(UserResponse, user.toJSON(), {
      excludeExtraneousValues: true,
    });
  }

  @Get('/verify/email/:code')
  async verifyEmail(@Param('code') code: string) {
    const user = await this.userService.verifyEmail(code);
    return plainToInstance(UserResponse, user.toJSON(), {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return plainToInstance(
      UpdateUserResponse,
      { userId: user.id, update: updateUserDto },
      { excludeExtraneousValues: true },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.userService.removeUser(id);
    return plainToInstance(
      DeleteUserResponse,
      { userId: removed.id, removed: true },
      { exposeDefaultValues: true },
    );
  }

  @Put('/tutorial/:id')
  async putTutorial(
    @Param('id') id: string,
    @Body() updateUserTutorialDto: UpdateUserTutorialDto,
  ) {
    const updatedUser = await this.userService.updateTutorial(
      id,
      updateUserTutorialDto,
    );

    return plainToInstance(
      UpdateUserResponse,
      { userId: updatedUser.id, update: updateUserTutorialDto },
      { excludeExtraneousValues: true },
    );
  }

  @Put('/password/:id')
  async putPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const updatedUser = await this.userService.password(id, updatePasswordDto);
    return plainToInstance(
      UpdateUserDto,
      { userId: updatedUser.id, update: { updatePasword: true } },
      { excludeExtraneousValues: true },
    );
  }

  @Post('/password/request')
  async passwordRequest(@Body() email: PasswordRequestUserDto) {
    return this.userService.passwordRequest(email);
  }
}
