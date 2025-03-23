"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Flag, Archive, AlertTriangle } from 'lucide-react';
import { ChallengeCard, Challenge } from '@/components/challenges/ChallengeCard';
import { useSearchParams } from 'next/navigation';
import c from "../../../public/week0.json";

// The challenges data from your input
const challenges: Challenge[] = c.challenges as any;

// Mock data for challenge sets
const challengeSets = {
  "current": c
};

type DifficultyType = 'all' | 'easy' | 'medium' | 'hard';

export default function ChallengesPage() {
  const searchParams = useSearchParams();
  const setParam = searchParams.get('set');

  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyType>('all');
  const [currentSet, setCurrentSet] = useState<string>("current");

  // Set the current challenge set based on URL param
  useEffect(() => {
    if (setParam && challengeSets[setParam as keyof typeof challengeSets]) {
      setCurrentSet(setParam);
    } else {
      setCurrentSet("current");
    }
  }, [setParam]);

  // Filter challenges based on selected difficulty
  const filteredChallenges = selectedDifficulty === 'all'
    ? challenges
    : challenges.filter(challenge => challenge.difficulty === selectedDifficulty);

  // Count challenges by difficulty
  const counts = {
    all: challenges.length,
    easy: challenges.filter(c => c.difficulty === 'easy').length,
    medium: challenges.filter(c => c.difficulty === 'medium').length,
    hard: challenges.filter(c => c.difficulty === 'hard').length
  };

  // Function to render difficulty filter button
  const renderFilterButton = (difficulty: DifficultyType, label: string) => {
    const isActive = selectedDifficulty === difficulty;
    const buttonClasses = `px-3 py-1 rounded-none text-sm ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary/50 text-foreground/70 hover:text-foreground hover:bg-secondary'
    }`;

    return (
      <button
        className={buttonClasses}
        onClick={() => setSelectedDifficulty(difficulty)}
      >
        {label} ({counts[difficulty]})
      </button>
    );
  };

  // Get current set information
  const currentSetInfo = challengeSets[currentSet as keyof typeof challengeSets] || challengeSets.current;

  return (
    <div className="mx-auto max-w-(--breakpoint-md) px-4 flex flex-col gap-y-6">
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center gap-x-1.5 hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span className="text-foreground">
              <span className="flex items-center gap-x-2">
                <Flag className="h-4 w-4" /> Challenges
              </span>
            </span>
          </li>
        </ol>
      </nav>

      {/* Current Challenge Set Info */}
      <div className="rounded-none border bg-background">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold tracking-tight">{currentSetInfo.title}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentSetInfo.dateRange} • {currentSetInfo.description}
          </p>
        </div>
      </div>

      {/* Difficulty filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {renderFilterButton('all', 'All')}
        {renderFilterButton('easy', 'Easy')}
        {renderFilterButton('medium', 'Medium')}
        {renderFilterButton('hard', 'Hard')}
      </div>

      {/* Challenge grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.name} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
