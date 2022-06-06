import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventsDto {
  @ApiProperty({
    example: '6286adfbd8e07d7906492dd2',
    description: 'Es el Id del usuario',
  })
  @IsObject()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
