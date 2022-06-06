import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDaoDto {
  @ApiProperty({
    example: '6286adfbd8e07d7906492dd2',
    description: 'Es el Id del usuario',
  })
  @IsString()
  @IsNotEmpty()
  key: string;
}
