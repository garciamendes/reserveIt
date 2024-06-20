import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusSpot } from '@prisma/client';
import { ReserveSpotDto } from './dto/reserve-spot-dto';

@Injectable()
export class SpotsService {
  constructor(private prisma: PrismaService) {}

  async create(eventId: string, createSpotDto: CreateSpotDto) {
    const spot = await this.prisma.spot.create({
      data: {
        ...createSpotDto,
        event: { connect: { id: eventId } },
      },
      include: {
        event: {
          select: {
            name: true,
          },
        },
      },
    });

    return spot;
  }

  async findAll(eventId: string) {
    const spots = await this.prisma.spot.findMany({
      where: { eventId },
      include: { event: { select: { name: true } } },
    });

    return spots;
  }

  async findOne(eventId: string, id: string) {
    const spot = await this.prisma.spot.findUnique({
      where: { eventId, id },
      include: { event: { select: { name: true } } },
    });

    if (!spot) return null;

    return spot;
  }

  async update(eventId: string, id: string, updateSpotDto: UpdateSpotDto) {
    const spot = await this.prisma.spot.update({
      where: { eventId, id },
      data: updateSpotDto,
      include: { event: { select: { name: true } } },
    });

    return spot;
  }

  async remove(eventId: string, id: string) {
    await this.prisma.spot.delete({ where: { eventId, id } });
  }

  async reserveSpot(eventId: string, reserveSpotDto: ReserveSpotDto) {
    const spots = await this.prisma.spot.findMany({
      where: {
        eventId,
        id: { in: reserveSpotDto.spotsIds },
      },
    });

    for await (const spotData of spots) {
      this.prisma.$transaction(async (prisma) => {
        const spot = await prisma.spot.update({
          where: { eventId, id: spotData.id },
          data: { status: StatusSpot.RESERVED },
          include: { event: { select: { name: true } } },
        });

        await prisma.ticket.create({
          data: {
            ...reserveSpotDto,
            spot: { connect: { id: spot.id } },
          },
        });

        await prisma.resevationHistory.create({
          data: {
            ...reserveSpotDto,
            status: spot.status,
            spot: { connect: { id: spot.id } },
          },
        });
      });
    }
  }
}
