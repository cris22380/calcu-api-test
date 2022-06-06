import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

export const mockEventDao = {
  _id: new Types.ObjectId('6272bd051696dfbbcebf1acf'),
  creationDate: new Date('2022-05-04T13:39:58.356Z'),
  userId: new Types.ObjectId('6272bd051696dfbbce123456'),
};

export const MockEventModel = {
  provide: getModelToken('Events.timed'),
  useValue: {
    new: jest.fn().mockResolvedValue(mockEventDao),
    constructor: jest.fn().mockResolvedValue(mockEventDao),
    create: jest.fn(),
    findById: jest.fn(),
    exec: jest.fn(),
  },
};
