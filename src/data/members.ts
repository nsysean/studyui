// data/users.ts
import dbConnect from '../lib/mongo';
import User, { IUser } from '../models/user';

export const getUsers = async () => {
  await dbConnect();
  return User.find().lean();
};
