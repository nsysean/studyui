import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  pfp: string;
  name: string;
  pointsEarned: number;
}

const userSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  pfp: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);