import * as mongoose from 'mongoose';

export const EventDaoSchema = new mongoose.Schema(
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
