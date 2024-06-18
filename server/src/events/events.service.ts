import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    await this.prisma.event.create({ data: createEventDto });
  }

  async findAll(): Promise<Event[]> {
    return await this.prisma.event.findMany();
  }

  async findOne(id: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) return null;

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const isEventExist = await this.prisma.event.findUnique({ where: { id } });

    if (!isEventExist) throw new NotFoundException();

    await this.prisma.event.update({ where: { id }, data: updateEventDto });
  }

  async remove(id: string) {
    const isEventExist = await this.prisma.event.findUnique({ where: { id } });

    if (!isEventExist) throw new NotFoundException();

    await this.prisma.event.delete({ where: { id } });
  }
}
