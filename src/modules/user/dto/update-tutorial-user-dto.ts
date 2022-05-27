import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class UpdateUserTutorialDto {
  @ApiProperty({
    example: 'tutorial',
  })
  @IsString()
  @IsNotEmpty()
  property: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  value: number;
}
