import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { ReserveSpotDto } from './dto/reserve-spot-dto';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Param('eventId') eventId: string,
    @Body() createSpotDto: CreateSpotDto,
  ) {
    return this.spotsService.create(eventId, createSpotDto);
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.spotsService.findOne(eventId, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
    @Body() updateSpotDto: UpdateSpotDto,
  ) {
    return this.spotsService.update(eventId, id, updateSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.spotsService.remove(eventId, id);
  }

  @Post()
  reserveSpot(
    @Param('eventId') eventId: string,
    @Body() reserveSpotDto: ReserveSpotDto,
  ) {
    return this.spotsService.reserveSpot(eventId, reserveSpotDto);
  }
}
