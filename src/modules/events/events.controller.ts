import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('event-user')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  // solo lo uso para limpiar la db en desarrollo
  // @Get()
  // getHello(): any {
  //   this.eventService.delete();
  // }
}
