import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

export const mockEvents = {
  _id: new Types.ObjectId('6272bd051696dfbbcebf1acf'),
  creationDate: new Date('2022-05-04T13:39:58.356Z'),
  userId: new Types.ObjectId('6272bd051696dfbbce123456'),
};

export const MockEventsModel = {
  provide: getModelToken('Events.timed'),
  useValue: {
    new: jest.fn().mockResolvedValue(mockEvents),
    constructor: jest.fn().mockResolvedValue(mockEvents),
    create: jest.fn(),
    findById: jest.fn(),
    exec: jest.fn(),
  },
};
