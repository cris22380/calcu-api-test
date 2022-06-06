import * as mongoose from 'mongoose';

export const EventsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    creationDate: {
      type: Date,
    },
  },
  { collection: 'events.timed' },
);
