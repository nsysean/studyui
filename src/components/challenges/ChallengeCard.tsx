"use client";

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import Link from 'next/link';

export interface Challenge {
  name: string;
  contest: string;
  description: string;
  link: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  // Define difficulty badge colors
  const difficultyColors = {
    easy: "bg-green-500/20 text-green-500 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    hard: "bg-red-500/20 text-red-500 border-red-500/30"
  };

  return (
    <div className="border p-4 hover:bg-secondary/50 transition-colors duration-200">
      <Dialog>
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="shrink-0 mb-4 md:mb-0">
            <div className="size-16 bg-secondary/50 flex items-center justify-center rounded-none text-2xl font-mono">
              {challenge.name.slice(0, 2)}
            </div>
          </div>
          <div className="grow">
            <div className="flex justify-between items-start mb-2">
              <DialogTrigger asChild>
                <button className="text-start hover:text-primary transition-colors">
                  <h3 className="text-lg font-semibold">{challenge.name}</h3>
                </button>
              </DialogTrigger>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors ${difficultyColors[challenge.difficulty]}`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{challenge.contest}</p>
            <p className="text-sm mb-3 line-clamp-2">{challenge.description}</p>

            <div className="flex gap-2">
              <Link
                href={"https://github.com/blackb6a/intensive-study/tree/main/week0-web/" + challenge.link}
                target="_blank"
                className="duration-300 ease-in-out inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/50 h-9 w-9 rounded-none"
                aria-label="Open Challenge"
                title="Open Challenge"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">{challenge.name}</DialogTitle>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors ${difficultyColors[challenge.difficulty]}`}>
                {challenge.difficulty}
              </span>
            </div>
            <DialogDescription className="text-foreground/60">
              {challenge.contest}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="mb-4">{challenge.description}</p>
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold">Difficulty:</span> {challenge.difficulty}
              </div>
              <Link
                href={"https://github.com/blackb6a/intensive-study/tree/main/week0-web/" + challenge.link}
                target="_blank"
                className="duration-300 ease-in-out inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/50 h-9 px-4 rounded-none"
              >
                Open Challenge <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
