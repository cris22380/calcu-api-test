import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { EventsModule } from '../events/events.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    EventsModule,
  ],
  controllers: [UserController],
  providers: [UserService, EventsModule],
  exports: [UserService],
})
export class UserModule {}
