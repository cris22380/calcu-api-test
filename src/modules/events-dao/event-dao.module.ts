import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsDaoService } from './events-dao.service';
import { EventsDaoController } from './events-dao.controller';
import { EventDaoSchema } from './schemas/events-dao.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Events.timed', schema: EventDaoSchema },
    ]),
  ],
  controllers: [EventsDaoController],
  providers: [EventsDaoService],
  exports: [EventsDaoService],
})
export class EventsDaoModule {}
