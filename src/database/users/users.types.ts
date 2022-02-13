import { User } from '../../interfaces/User';

export interface UserDocument extends User, Document {}

export interface UserModel extends UserDocument {
  findUser: (userId: string) => Promise<UserDocument>;
}
