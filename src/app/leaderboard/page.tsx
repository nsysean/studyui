"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Trophy,
  Award,
  User,
  Github,
  Globe,
  Mail,
  Twitter,
} from 'lucide-react';

interface Member {
  _id: string;
  pfp: string;
  name: string;
  joined: string;
  solves: number;
  pointsEarned: number;
}

export default function LeaderboardPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API endpoint on component mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: Member[] = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Optionally, sort members by score (highest first)
  const sortedMembers = [...members].sort((a, b) => b.pointsEarned - a.pointsEarned);

  // Helper to get the appropriate icon for a link type
  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Globe className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-(--breakpoint-md) px-4 flex flex-col gap-y-6">
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li className="inline-flex items-center">
            <Link href="/" className="flex items-center gap-x-1.5 hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span className="text-foreground flex items-center gap-x-2">
              <Trophy className="h-4 w-4" /> Leaderboard
            </span>
          </li>
        </ol>
      </nav>

      <div className="rounded-none border bg-background/50 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Member Leaderboard</h1>
        <p className="text-sm text-muted-foreground">
          Rankings based on challenge solves and points earned
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="border rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary/70">
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Member</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-foreground">Solves</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-foreground">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedMembers.map((member, index) => (
                <tr
                  key={member._id}
                  className={`${index < 3 ? 'bg-secondary/30' : 'hover:bg-secondary/20'} transition-colors`}
                >
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center">
                      {index === 0 && <Award className="h-5 w-5 text-yellow-500 mr-1.5" />}
                      {index === 1 && <Award className="h-5 w-5 text-gray-400 mr-1.5" />}
                      {index === 2 && <Award className="h-5 w-5 text-amber-700 mr-1.5" />}
                      {index > 2 && <span className="ml-1.5 mr-1.5">{index + 1}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-secondary/70 rounded-full overflow-hidden">
                        {member.pfp ? (
                          <img
                            src={member.pfp}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Member since {new Date(member.joined).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <span className="px-2.5 py-1 rounded-full bg-secondary/40 text-foreground">
                      {member.solves}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-center font-semibold">
                    {member.pointsEarned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}