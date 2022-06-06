import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class SetAccountPlanDto {
  @ApiProperty({ example: 'plan-id-12312312312' })
  @IsString()
  @IsNotEmpty()
  planId: string;

  @ApiProperty({ example: { OFERTONA: 'ofertona-id-12312"' } })
  @IsObject()
  @IsNotEmpty()
  referral: Record<string, any>;
}
