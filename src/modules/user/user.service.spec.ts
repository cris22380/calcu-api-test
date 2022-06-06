import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { Events } from '../events/interfaces/events.interface';
import { EventsService } from '../events/events.service';
import { mockUser, MockUserModel } from './mocks/user.mocks';
import { MockEventsModel, mockEvents } from '../events/mocks/events.mocks';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;
  let eventModel: Model<Events>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, MockUserModel, MockEventsModel, EventsService],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
    eventModel = module.get<Model<Events>>(getModelToken('Events.timed'));
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
      expect(newUser).toEqual(mockUser);
    });

    it('should update user data', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValueOnce({ ...mockUser, first: 'user-name-test' }),
      } as any);

      const user = await service.update(mockUser.id, {
        first: 'user-name-test',
      });

      const updated = await service.getUserById(user.id);

      expect(user).toEqual({
        ...mockUser,
      });
      expect(updated).toEqual({
        ...mockUser,
        first: 'user-name-test',
      });
    });

    it('should update user tutorial', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValueOnce({ ...mockUser, tutorial: { done: 1 } }),
      } as any);

      const updateUser = await service.updateTutorial(mockUser._id, {
        property: 'done',
        value: 1,
      });

      const updated = await service.getUserById(updateUser.id);

      expect(updateUser).toEqual({
        ...mockUser,
      });
      expect(updated).toEqual({
        ...mockUser,
        tutorial: { done: 1 },
      });
    });

    it('should update user password', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...mockUser,
          hashedPassword: '91b044070c368d687539dbf5248c5f4662c0a5e2',
        }),
      } as any);

      const updateUser = await service.password(mockUser._id, {
        hashedPassword: '37348339f1932396a8caf4a8a67bd954b0571fcf',
        currentPassword: 'qwerty123',
        newPassword: 'asdfgh123',
      });

      const updated = await service.getUserById(updateUser.id);
      expect(updateUser).toEqual(mockUser);
      expect(updated).toEqual({
        ...mockUser,
        hashedPassword: '91b044070c368d687539dbf5248c5f4662c0a5e2',
      });
    });

    it('should update user accout plan', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...mockUser,
          planId: 'plan-id-121212',
          referral: { OFERTONA: 'ofertona-id-1211212' },
        }),
      } as any);
      const updateUser = await service.setAccountPlan(mockUser._id, {
        planId: 'plan-id-121212',
        referral: { OFERTONA: 'ofertona-id-1211212' },
      });

      const updated = await service.getUserById(updateUser.id);

      expect(updateUser).toEqual({
        ...mockUser,
      });
      expect(updated).toEqual({
        ...mockUser,
        planId: 'plan-id-121212',
        referral: { OFERTONA: 'ofertona-id-1211212' },
      });
    });
  });

  describe('Query operations', () => {
    it('should return delete une user by id', async () => {
      jest.spyOn(model, 'findOneAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const userDeleted = await service.removeUser(mockUser.id);
      expect(userDeleted).toEqual(mockUser);
    });

    it('should return a user by id', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const newUser = await service.getUserById(mockUser.id);
      expect(newUser).toEqual(mockUser);
    });

    it('should verify email with code', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const user = await service.verifyEmail(mockUser.code);
      expect(user).toEqual(mockUser);
    });

    it('should send a password request', async () => {
      jest
        .spyOn(eventModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockEvents));

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const passwordRequest = await service.passwordRequest({
        email: mockUser.email,
      });

      expect(passwordRequest).toEqual({ event: mockEvents, user: mockUser });
    });

    it('should verify a password key', async () => {
      jest.spyOn(eventModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockEvents),
      } as any);

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const verified = await service.verifyPasswordKey(mockUser._id);

      expect(verified).toEqual(mockUser);
    });
  });
});
