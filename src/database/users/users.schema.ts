import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { User } from '../../interfaces/User';
import { findUser } from './users.statics';

const UserSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  todos: { type: [], default: [], required: true },
  createdDate: { type: Date, default: new Date(), required: true },
  id: { type: String, default: uuid(), required: false },
});

UserSchema.statics.findUser = findUser;

export { UserSchema };
