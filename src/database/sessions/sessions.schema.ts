import { Schema } from 'mongoose';

import { Session } from '../../interfaces/Auth';

const SessionsSchema = new Schema<Session>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  _expires: { type: Date, required: true },
  path: { type: String, required: true },
  originalMaxAge: { type: Number, required: true },
  httpOnly: { type: Boolean, required: true },
  email: { type: String, required: true },
  sessionId: { type: String, required: true },
});

export { SessionsSchema };
