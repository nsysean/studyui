"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Flag, Archive, AlertTriangle } from 'lucide-react';
import { ChallengeCard, Challenge } from '@/components/challenges/ChallengeCard';
import { useSearchParams } from 'next/navigation';

// The challenges data from your input
const challenges: Challenge[] = [
  {
    "name": "login",
    "contest": "ACSC 2024",
    "description": "Here comes yet another boring login page ...",
    "link": "./sets/easy/acsc-login/dist/",
    "difficulty": "easy"
  },
  {
    "name": "basixss",
    "contest": "Original task from ensy",
    "description": "XSS so simple I did not bother to make xss bot",
    "link": "./sets/easy/basixss/dist/",
    "difficulty": "easy"
  },
  {
    "name": "gpwaf",
    "contest": "DiceCTF 2024 Quals",
    "description": "i made a ejs renderer, its 100% hack proof im using gpt to check all your queries! please note that the backend for this challenge is not the same as the one given to avoid leaking our API key, but the queries to the OpenAI API are exactly the same.",
    "link": "./sets/easy/gpwaf/dist/",
    "difficulty": "easy"
  },
  {
    "name": "idoriot",
    "contest": "ImaginaryCTF 2023",
    "description": "Some idiot made this web site that you can log in to. The idiot even made it in php. I dunno.",
    "link": "./sets/easy/idoriot/dist/",
    "difficulty": "easy"
  },
  {
    "name": "jsonwebtoken",
    "contest": "Original task from ensy",
    "description": "Simple JWT challenge as reflected by this simple description",
    "link": "./sets/easy/jsonwebtoken/",
    "difficulty": "easy"
  },
  {
    "name": "penguin-login",
    "contest": "LACTF 2024",
    "description": "I got tired of people leaking my password from the db so I moved it out of the db.",
    "link": "./sets/easy/penguin-login/dist/",
    "difficulty": "easy"
  },
  {
    "name": "purell",
    "contest": "LACTF 2025",
    "description": "Here in purellland, we sanitize your inputs. We kill 99% of germs, can you be the 1% germ that slips through?",
    "link": "./sets/easy/purell/dist/",
    "difficulty": "easy"
  },
  {
    "name": "ssrf101",
    "contest": "WolvSec CTF",
    "description": "Read challenge name",
    "link": "./sets/easy/ssrf101/dist/",
    "difficulty": "easy"
  },
  {
    "name": "websec-level10",
    "contest": "from websec.fr",
    "description": "Integrity without knowledge is weak and useless, and knowledge without integrity is dangerous and dreadful.",
    "link": "./sets/easy/websec-level10/dist/",
    "difficulty": "easy"
  },
  {
    "name": "flagproxy",
    "contest": "TeamItaly CTF 2022",
    "description": "I just added authentication to my flag service (server-back) thanks to a proxy (server-front), but a friend said it's useless...",
    "link": "./sets/medium/flagproxy/dist/",
    "difficulty": "medium"
  },
  {
    "name": "imagestore",
    "contest": "TeamItaly CTF 2022",
    "description": "I keep too many photos of pizzas on my computer and my drive is almost full. Unfortunately I can't simply upload them to Google Photos because I don't like public cloud. So I decided to write my own CLI service to store all my images! Can you read /flag?",
    "link": "./sets/medium/imagestore/dist/",
    "difficulty": "medium"
  },
  {
    "name": "jsonweirdtoken",
    "contest": "Original task from ensy",
    "description": "look carefully i think is a fun chall but may be slightly difficult",
    "link": "./sets/medium/jsonweirdtoken/",
    "difficulty": "medium"
  },
  {
    "name": "jspyaml",
    "contest": "HKCERT CTF 2024 Qualifying Round",
    "description": "I only know how to parse YAML with Python, so I use JS to run Python to parse YAML.",
    "link": "./sets/medium/jspyaml/dist/",
    "difficulty": "medium"
  },
  {
    "name": "pico-note-1",
    "contest": "AlpacaHack Round 2",
    "description": "The template engine is very simple but powerful 🔥",
    "link": "./sets/medium/pico-note-1/dist/",
    "difficulty": "medium"
  },
  {
    "name": "gigachessbased",
    "contest": "LACTF 2025",
    "description": "I was too focused on the trap, I forgot about the cheese.",
    "link": "./sets/hard/gigachessbased/dist/",
    "difficulty": "hard"
  },
  {
    "name": "blogdog",
    "contest": "x3CTF 2025",
    "description": "I'm starting a new website where we can blog about dogs! Could you write us an article?",
    "link": "./sets/hard/og-blogdog/dist/",
    "difficulty": "hard"
  },
  {
    "name": "pico-note-2",
    "contest": "AlpacaHack Round 2",
    "description": "How many note applications have I created for CTFs so far? This is one of them.",
    "link": "./sets/hard/pico-note-2/dist/",
    "difficulty": "hard"
  }
];

// Mock data for challenge sets
const challengeSets = {
  "current": {
    id: "week0-2025",
    title: "Week 0 - 2025 Challenges",
    dateRange: "March 24 - March 30, 2025",
    description: "This week focuses on application logic flaws and vulnerabilities of web applications.",
  },
  "week-1-2025": {
    id: "week-1-2025",
    title: "Week -1 - 2025 Challenges",
    dateRange: "March 17 - March 23, 2025",
    description: "Focus on binary exploitation techniques.",
  },
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
