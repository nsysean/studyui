// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { getUsers } from '../../../data/members';

export async function GET(request: Request) {
  try {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}