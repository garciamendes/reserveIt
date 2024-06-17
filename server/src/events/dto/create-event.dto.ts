import { IsDecimal, IsNotEmpty, IsString } from 'class-validator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  date: string

  @IsDecimal()
  @IsNotEmpty()
  price: number
}
