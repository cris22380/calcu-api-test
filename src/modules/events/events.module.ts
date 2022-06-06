import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsSchema } from './schemas/events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Events.timed', schema: EventsSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
