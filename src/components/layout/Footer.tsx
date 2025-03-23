"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Mail, Rss } from 'lucide-react';

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const currentYear = mounted ? new Date().getFullYear() : 2025; // Default to 2025 for SSR

  // Prevent hydration errors by only running on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="py-4">
      <div className="mx-auto max-w-(--breakpoint-md) px-4">
        <div className="flex flex-col items-center justify-center gap-y-2 sm:flex-row sm:justify-between">
          <div className="flex items-center">
            <p className="z-1 text-center text-sm" suppressHydrationWarning>
              © {currentYear} Black Bauhinia
            </p>
          </div>

          <ul className="not-prose flex flex-wrap gap-2 z-10" role="list">
            <li>
              <Link
                href="https://github.com/blackb6a"
                target="_blank"
                className="duration-300 ease-in-out inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/50 h-9 w-9 rounded-none"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link
                href="mailto:hello@b6a.black"
                target="_blank"
                className="duration-300 ease-in-out inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/50 h-9 w-9 rounded-none"
                aria-label="Email"
                title="Email"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
