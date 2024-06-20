import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create new event', async () => {
    const nowDate = new Date().toISOString();

    const result = await service.create({
      name: 'test',
      description: 'test',
      price: 100,
      date: nowDate,
    });
    expect(result).toBeDefined();

    expect(result.id).toBeDefined();
    expect(result.name).toBe('test');
    expect(result.description).toBe('test');
    expect(result.price).toBe(100);
    expect(result.date).toBe(nowDate);
    expect(result.created_at).toBeDefined();
    expect(result.modified_at).toBeDefined();
  });
});
