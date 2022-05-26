import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  first: {
    type: String,
  },
  last: {
    type: String,
  },
  location: {
    type: String,
  },
  locale: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  tutorial: {
    done: { type: Number },
  },
  isBusiness: {
    type: Boolean,
  },
  roles: {
    type: String,
  },
  collapsed: {
    type: String,
  },
  code: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
  emailPrev: {
    type: String,
  },
});
