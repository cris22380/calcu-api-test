import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

const mockUser = {
  _id: '6272bd051696dfbbcebf1acf',
  tutorial: { done: '1' },
  id: 'userid1',
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
  code: null,
  hashedPassword: null,
};

const usersArray = [
  {
    ...mockUser,
    _id: '6272bd051696dfbbcebf1acf',
    id: 'userid1',
    email: 'user1_test1@nest.com',
    password: 'qwerty123',
    first: 'user1',
    last: 'usertest1',
    emailPrev: 'user1.test@calcubox.com',
    creationDate: new Date('2022-05-04T13:39:58.356Z'),
  },
  {
    ...mockUser,
    _id: '6272bea843ae525f30a56b78',
    email: 'user2_test1@nest.com',
    password: 'qwerty123',
    first: 'user2',
    last: 'usertest2',
    emailPrev: 'user2.test@calcubox.com',
    creationDate: new Date('2022-02-04T13:39:58.356Z'),
  },
  {
    ...mockUser,
    _id: '6272bea843ae525f30a22e45',
    email: 'user3_test1@nest.com',
    password: 'qwerty123',
    first: 'user3',
    last: 'usertest3',
    emailPrev: 'user3.test@calcubox.com',
    creationDate: new Date('2022-02-04T13:39:58.356Z'),
  },
];

const MockModel = {
  provide: getModelToken('User'),
  useValue: {
    new: jest.fn().mockResolvedValue(mockUser),
    constructor: jest.fn().mockResolvedValue(mockUser),
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    exec: jest.fn(),
  },
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, MockModel],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));

    // jest.clearAllMocks();
  });

  it('should be defined', () => {
    console.log(MockModel.useValue.create);
    expect(service).toBeDefined();
  });

  describe('Creation and update operations', () => {
    it('should insert a new user', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          ...mockUser,
        }),
      );
      const newUser = await service.register({
        ...mockUser,
        email: 'newUser@test.com',
      });
      expect(newUser).toEqual(mockUser);
    });

    it('Should update user data', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const updateUser = await service.update(mockUser.id, {
        first: 'user-name-test',
      });

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValueOnce({ ...mockUser, username: 'user-name-test' }),
      } as any);

      const newUser = await service.findOne(updateUser.id);

      expect(newUser).toEqual({ ...mockUser, username: 'user-name-test' });
    });
  });

  describe('Query operations', () => {
    it('should return all users', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(usersArray),
      } as any);
      const users = await service.findAll();
      expect(users).toEqual(usersArray);
    });

    it('should return a user by id', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const newUser = await service.findOne(mockUser._id);
      expect(newUser).toEqual(mockUser);
    });
  });
});
