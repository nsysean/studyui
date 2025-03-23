// src/contexts/ChallengesContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface User {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface Challenge {
  _id: string;
  name: string;
  solvedBy: User[];
  // You can add additional fields as needed, e.g., description, difficulty, etc.
}

interface ChallengesContextType {
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ChallengesContext = createContext<ChallengesContextType>({
  challenges: [],
  loading: true,
  error: null,
  refetch: () => {},
});

export const useChallenges = () => useContext(ChallengesContext);

export const ChallengesProvider = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/challenges");
      if (!res.ok) {
        throw new Error("Failed to fetch challenges");
      }
      const data: Challenge[] = await res.json();
      setChallenges(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <ChallengesContext.Provider
      value={{ challenges, loading, error, refetch: fetchChallenges }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};