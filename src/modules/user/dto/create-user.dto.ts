import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsObject,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '6286adfbd8e07d7906492dd2',
    description: 'El id se crea en el user service',
  })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ example: 'user@calcubox.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'qwerty123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'User Name' })
  @IsString()
  @IsNotEmpty()
  first: string;

  @ApiProperty({ example: 'User Last Name' })
  @IsString()
  @IsNotEmpty()
  last: string;

  @ApiPropertyOptional({
    example: 'CABA',
    description: 'Optional user location',
  })
  @IsString()
  @IsOptional()
  location: string;

  @ApiPropertyOptional({ example: 'Argentina', description: 'description' })
  @IsString()
  @IsOptional()
  locale: string;

  @ApiPropertyOptional({
    example: '$2b$10$NlnYZu6hhEts2Wt6bM.m0OwYusBaotxnlFuhEJ71.ztzuzNmx59M',
    description: 'Optional acces token',
  })
  @IsString()
  @IsOptional()
  accessToken: string;

  @ApiPropertyOptional({
    example: { done: 1 },
    description: 'Optional tutorial state',
  })
  @IsObject()
  @IsOptional()
  tutorial: Record<string, any>;

  @ApiProperty({ example: true, description: 'description' })
  @IsBoolean()
  @IsOptional()
  isBusiness: boolean;

  @ApiPropertyOptional({
    example: 'counter',
    description: 'Optional user role',
  })
  @IsString()
  @IsOptional()
  roles: string;

  @ApiPropertyOptional({ example: 'collapsed', description: 'description' })
  @IsString()
  @IsOptional()
  collapsed: string;

  @ApiPropertyOptional({
    example: 'lnYZu6hhEts2Wt6bM.m0OwYusBaotxnl',
    description: 'Optional code for validations',
  })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({
    example: '$2b$10$9wjT6TxGqxoGOlLxMxTULeH1mmdBy8WBYMTiQc6t8TZ/z/PIvvQCe',
    description: 'El hashedPassword se crea en el user service',
  })
  @IsString()
  @IsOptional()
  hashedPassword: string;

  @ApiPropertyOptional({
    example: 'email.prev@calcubox',
    description: 'Optional previus email',
  })
  @IsEmail()
  @IsOptional()
  emailPrev: string;
}
