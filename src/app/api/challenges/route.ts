import { NextResponse } from "next/server";
import { getChallenge, getChallenges } from "@/data/challenges";

export async function GET(
  request: Request,
) {
  try {
    const chal = await getChallenges();
    return NextResponse.json(chal, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
