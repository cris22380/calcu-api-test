import { Document } from 'mongoose';

export interface EventsDao extends Document {
  userId: string;
}
