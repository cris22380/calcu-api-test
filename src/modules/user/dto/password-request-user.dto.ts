import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordRequestUserDto {
  @ApiProperty({
    example: 'example@test.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
}
