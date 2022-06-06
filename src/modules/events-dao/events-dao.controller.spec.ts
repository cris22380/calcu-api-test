import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EventsDaoController } from './events-dao.controller';
import { EventsDaoService } from './events-dao.service';
import { MockEventModel } from './mocks/events-dao.mocks';

describe('EventsDaoController', () => {
  let controller: EventsDaoController;
  let service: EventsDaoService;
  let model: Model<Event>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsDaoController],
      providers: [EventsDaoService, MockEventModel],
    }).compile();

    controller = module.get<EventsDaoController>(EventsDaoController);
    service = module.get<EventsDaoService>(EventsDaoService);
    model = module.get<Model<Event>>(getModelToken('Events.timed'));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
