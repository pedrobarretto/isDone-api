import { model } from 'mongoose';

import { SessionsSchema } from './sessions.schema';
import { SessionDocument } from './sessions.types';

export const SessionModel = model<SessionDocument>('sessions', SessionsSchema);
