import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '37348339f1932396a8caf4a8a67bd954b05dfvgs',
  })
  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @ApiProperty({
    example: 'qwerty123',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    example: 'asdfgh1234',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
