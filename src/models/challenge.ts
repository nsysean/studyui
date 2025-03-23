import mongoose, { Schema, Document } from 'mongoose';
import "./user";

export interface IChallenge extends Document {
  name: string;
  solvedBy: Array<any>;
}

const challengeSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true,
  },
  solvedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  }],
});

export default mongoose.models.Challenge || mongoose.model<IChallenge>('Challenge', challengeSchema);