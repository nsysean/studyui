// data/users.ts
import challenge from '@/models/challenge';
import dbConnect from '../lib/mongo';

export const getChallenge = async (challengeName: any) => {
  await dbConnect();
  return challenge.findOne({ name: challengeName }).populate('solvedBy').lean();
};

export const getChallenges = async () => {
    await dbConnect();
    return challenge.find().populate('solvedBy').lean();
  };
  