import { Document } from 'mongoose';

export interface Events extends Document {
  userId: string;
}
