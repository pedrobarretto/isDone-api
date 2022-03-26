import { User } from '../../interfaces/User';
import { UserModel } from './users.model';
import { UserDocument } from './users.types';

export async function findUser(id: string): Promise<UserDocument> {
  const record = await UserModel.findOne({ id });
  return record;
}

export async function listUsers(): Promise<UserDocument[]> {
  const all = await UserModel.find({});
  return all;
}

export async function createUser(dto: User): Promise<UserDocument> {
  const user = await UserModel.create(dto);
  return user;
}

export async function findUserByEmail(email: string): Promise<UserDocument> {
  const user = await UserModel.findOne({ email });
  return user;
}

export async function deleteUser(id: string): Promise<void> {
  await UserModel.deleteOne({ id });
}
