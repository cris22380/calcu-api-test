import { Controller } from '@nestjs/common';
import { EventsDaoService } from './events-dao.service';

@Controller('event-user')
export class EventsDaoController {
  constructor(private readonly eventService: EventsDaoService) {}

  // solo lo uso para limpiar la db en desarrollo
  // @Get()
  // getHello(): any {
  //   this.eventService.delete();
  // }
}
