import { getModelToken } from '@nestjs/mongoose';

export const mockUser = {
  _id: '6272bd051696dfbbcebf1acf',
  tutorial: null,
  id: '6272bd051696dfbbcebf1acf',
  email: 'leila_test1@nest.com',
  password: 'qwerty123',
  first: 'leila',
  last: 'caraca',
  location: null,
  locale: null,
  accessToken: null,
  isBusiness: true,
  roles: null,
  collapsed: null,
  emailPrev: 'leila.test@calcubox.com',
  creationDate: new Date('2022-05-04T13:39:58.356Z'),
  code: 'verifycation.code.id.123456',
  hashedPassword: '37348339f1932396a8caf4a8a67bd954b0571fcf',
};

export const MockUserModel = {
  provide: getModelToken('User'),
  useValue: {
    new: jest.fn().mockResolvedValue(mockUser),
    constructor: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    exec: jest.fn(),
  },
};
