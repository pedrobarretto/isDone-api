import { UserModel } from './users.model';
import { UserDocument } from './users.types';

export async function findByEmail(email: string): Promise<UserDocument> {
  const user = await UserModel.findOne({ email });
  return user;
}
