import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserTutorialDto } from './dto/update-tutorial-user-dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('/verify/email/:code')
  verifyEmail(@Param('code') code: string) {
    return this.userService.verifyEmail(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @Put('/tutorial/:id')
  updateTutorial(
    @Param('id') id: string,
    @Body() updateUserTutorialDto: UpdateUserTutorialDto,
  ) {
    return this.userService.updateTutorial(id, updateUserTutorialDto);
  }
}
