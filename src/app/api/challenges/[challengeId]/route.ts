"use c"
import { NextResponse } from 'next/server';
import { getUsers } from '../../../../data/members';
import { getChallenge } from '@/data/challenges';

export async function GET(request: Request, { params }: { params: { challengeId: string } }) {
  try {
    const chal = await getChallenge(params.challengeId);
    return NextResponse.json(chal, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}