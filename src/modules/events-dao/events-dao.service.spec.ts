import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventsDaoService } from './events-dao.service';
import { EventsDao } from './interfaces/events-dao.interface';
import { mockEventDao, MockEventModel } from './mocks/events-dao.mocks';

describe('EvenService', () => {
  let service: EventsDaoService;
  let model: Model<EventsDao>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsDaoService, MockEventModel],
    }).compile();

    service = module.get<EventsDaoService>(EventsDaoService);
    model = module.get<Model<EventsDao>>(getModelToken('Events.timed'));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Creation and update operations', () => {
    it('should insert a new event', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          ...mockEventDao,
        }),
      );
      const newEvent = await service.register({
        userId: mockEventDao.userId,
      });
      expect(newEvent).toEqual(mockEventDao);
    });
  });
  describe('Query operations', () => {
    it('should get evnt by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockEventDao),
      } as any);

      const event = await service.getById(mockEventDao._id.toString());
      expect(event).toEqual(mockEventDao);
    });
  });
});
