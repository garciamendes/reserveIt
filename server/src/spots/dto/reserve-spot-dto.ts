import { TicketKind } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class ReserveSpotDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(TicketKind)
  ticketKind: TicketKind;

  @IsNotEmpty()
  @IsArray()
  spotsIds: string[];
}
