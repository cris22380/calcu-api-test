import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventsService } from './events.service';
import { Events } from './interfaces/events.interface';
import { mockEvents, MockEventsModel } from './mocks/events.mocks';

describe('EvenService', () => {
  let service: EventsService;
  let model: Model<Events>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService, MockEventsModel],
    }).compile();

    service = module.get<EventsService>(EventsService);
    model = module.get<Model<Events>>(getModelToken('Events.timed'));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Creation and update operations', () => {
    it('should insert a new event', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          ...mockEvents,
        }),
      );
      const newEvent = await service.register({
        userId: mockEvents.userId,
      });
      expect(newEvent).toEqual(mockEvents);
    });
  });
  describe('Query operations', () => {
    it('should get evnt by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockEvents),
      } as any);

      const event = await service.getById(mockEvents._id.toString());
      expect(event).toEqual(mockEvents);
    });
  });
});
