import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { Events } from '../events/interfaces/events.interface';
import { EventsService } from '../events/events.service';
import { MockUserModel } from './mocks/user.mocks';
import { MockEventsModel } from '../events/mocks/events.mocks';

describe('UserController', () => {
  let controller: UserController;
  let model: Model<User>;
  let service: UserService;
  let eventModel: Model<Events>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, MockUserModel, MockEventsModel, EventsService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
    eventModel = module.get<Model<Events>>(getModelToken('Events.timed'));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
