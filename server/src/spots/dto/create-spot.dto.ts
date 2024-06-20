import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpotDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
