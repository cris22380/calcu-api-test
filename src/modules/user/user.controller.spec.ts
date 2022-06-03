import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { EventsDao } from '../events-dao/interfaces/events-dao.interface';
import { EventsDaoService } from '../events-dao/events-dao.service';
import { MockUserModel } from './mocks/user.mocks';
import { MockEventModel } from '../events-dao/mocks/events-dao.mocks';

describe('UserController', () => {
  let controller: UserController;
  let model: Model<User>;
  let service: UserService;
  let eventModel: Model<EventsDao>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, MockUserModel, MockEventModel, EventsDaoService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
    eventModel = module.get<Model<EventsDao>>(getModelToken('Events.timed'));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
