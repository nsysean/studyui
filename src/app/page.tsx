"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Flag, Trophy, User } from "lucide-react";
import c from "../../public/week0.json"

type Difficulty = 'easy' | 'medium' | 'hard';

// Current challenge set info
const currentChallengeSet = c

// Map difficulty to color classes
const difficultyClasses = {
  easy: "bg-green-500/20 text-green-500 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  hard: "bg-red-500/20 text-red-500 border-red-500/30",
};

export default function Home() {
  // Use useState to hold the members fetched from /api/users and a loading state.
  const [topMembers, setTopMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all members from the API, sort by score descending and store the top five.
  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch members");
        }
        const data = await res.json();
        // Sort members by score (in case score is undefined, default to 0)
        const sortedMembers = data.sort(
          (a: any, b: any) => b.pointsEarned - a.pointsEarned
        );
        setTopMembers(sortedMembers.slice(0, 5));
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  return (
    <div className="mx-auto max-w-(--breakpoint-md) px-4 flex flex-col gap-y-6">
      {/* Intro Section */}
      <section>
        <div className="rounded-none border bg-background">
          <div className="p-6 prose dark:prose-invert">
            <p className="text-sm text-muted-foreground">
              This site is an experimental co-learning project by the Hong Kong
              capture-the-flag (CTF) team{" "}
              <a
                href="https://ctftime.org/team/83678/"
                target="_self"
                className="inline-block transition-colors duration-300 ease-in-out underline decoration-muted-foreground underline-offset-[3px] hover:decoration-foreground"
              >
                Black Bauhinia
              </a>
              . Through meticulously curated sets of challenges, we hope to create
              an environment for CTF players to strive and explore new fields and
              categories.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Challenge Section */}
        <section className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Current set</h2>
            <span className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1.5 h-4 w-4" />{" "}
              {currentChallengeSet.dateRange}
            </span>
          </div>

          <div className="rounded-none border bg-background/50 p-6 h-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                {currentChallengeSet.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {currentChallengeSet.description}
              </p>
            </div>

            <div className="mt-6 mb-6">
              <h4 className="text-base font-semibold mb-3 flex items-center">
                <Flag className="mr-2 h-4 w-4" /> Featured challenges
              </h4>
              <ul className="space-y-2">
                {currentChallengeSet.featuredChallenges.map((challenge) => (
                  <li
                    key={challenge.name}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <span>{challenge.name}</span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors ${difficultyClasses[challenge.difficulty as Difficulty]}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <Link
                href="/challenges"
                className="duration-300 ease-in-out inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/80 h-9 px-4 py-2 group"
              >
                View all challenges{" "}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Top Solvers Section */}
        <section className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Top solvers</h2>
            <Link
              href="/leaderboard"
              className="text-sm text-primary hover:underline flex items-center"
            >
              View full leaderboard{" "}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-none border bg-background/50 p-6 h-full">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="flex flex-col gap-4">
                {topMembers.map((member, index) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between border-b border-border pb-3"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3 w-8 text-center">
                        {index === 0 ? (
                          <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                        ) : (
                          <span className="text-sm font-semibold">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-secondary/70 rounded-full flex items-center justify-center overflow-hidden mr-3">
                          {member.pfp ? (
                            <img
                              src={member.pfp}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.solves} solves
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-semibold">
                      {member.pointsEarned + " "}
                      pts
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Link
                href="/leaderboard"
                className="duration-300 ease-in-out inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/80 h-9 px-4 py-2 group"
              >
                View leaderboard{" "}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}