import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

const mockUser = {
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
  hashedPassword: null,
};

const MockModel = {
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

const mockBuildUserInfo: (user: Record<string, any>) => any = (user) => {
  const userRegistrationInfo = {
    email: user.email,
    first: user.first,
    last: user.last,
    location: user.location,
    locale: user.locale,
    tutorial: user.tutorial,
    isBusiness: user.isBusiness,
    roles: user.roles,
    collapsed: user.collapsed,
    emailPrev: user.emailPrev,
    id: user.id,
  };
  return userRegistrationInfo;
};

const mockBuildDeletedInfo: (user: Record<string, any>) => any = (user) => {
  return { userDeleted: true, id: user.id };
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
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Creation and update operations', () => {
    it('should insert a new user', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          ...mockUser,
        }),
      );
      const newUser = await service.register({
        ...mockUser,
        email: 'newUser@test.com',
      });
      expect(newUser).toEqual(mockBuildUserInfo(mockUser));
    });

    it('Should update user data', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const updateUser = await service.update(mockUser.id, {
        first: 'user-name-test',
      });

      expect(updateUser).toEqual({
        userId: mockUser.id,
        first: 'user-name-test',
      });
    });

    it('Should update user tutorial', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const updateUser = await service.updateTutorial(mockUser._id, {
        property: 'done',
        value: 1,
      });

      expect(updateUser).toEqual({
        userId: mockUser.id,
        tutorial: { done: 1 },
      });
    });
  });

  describe('Query operations', () => {
    it('should return delete une user by id', async () => {
      jest.spyOn(model, 'findOneAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockBuildDeletedInfo(mockUser)),
      } as any);

      const userDeleted = await service.removeUser(mockUser.id);
      expect(userDeleted).toEqual(mockBuildDeletedInfo(mockUser));
    });

    it('should return a user by id', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const newUser = await service.getUserById(mockUser.id);
      expect(newUser).toEqual(mockBuildUserInfo(mockUser));
    });

    it('should verify email with code', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const user = await service.verifyEmail(mockUser.code);
      expect(user).toEqual(mockBuildUserInfo(mockUser));
    });
  });
});
