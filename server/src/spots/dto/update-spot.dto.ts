import { PartialType } from '@nestjs/mapped-types';
import { CreateSpotDto } from './create-spot.dto';
import { IsEnum } from 'class-validator';
import { StatusSpot } from '@prisma/client';

export class UpdateSpotDto extends PartialType(CreateSpotDto) {
  @IsEnum(StatusSpot)
  status: StatusSpot;
}
