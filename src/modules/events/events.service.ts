import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Events } from './interfaces/events.interface';
import { CreateEventsDto } from './dto/create-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Events.timed') private readonly eventModel: Model<Events>,
  ) {}
  /**
   * To register an event that will expire in 4hs
   */
  async register(event: CreateEventsDto): Promise<Events> {
    return this.eventModel.create({
      ...event,
      _id: new Types.ObjectId(),
      creationDate: new Date(),
    });
  }

  async getById(key: string): Promise<Events> {
    // Look up for the user by the given code
    return this.eventModel
      .findById({
        _id: new Types.ObjectId(key),
      })
      .exec();
  }

  // solo lo uso para limpiar la db durante el desarrollo
  // async delete(): Promise<any> {
  //   const a = await this.eventModel.find();
  //   const b = a.map((p) => this.eventModel.deleteOne({ _id: p._id }));
  //   console.log(a);
  //   return Promise.all(b);
  // }
}
