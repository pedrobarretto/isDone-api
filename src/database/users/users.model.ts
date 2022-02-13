import { model } from 'mongoose';

import { UserSchema } from './users.schema';
import { UserDocument } from './users.types';

export const UserModel = model<UserDocument>('todos', UserSchema);
