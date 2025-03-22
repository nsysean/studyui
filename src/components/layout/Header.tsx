"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

const navItems = [
  { name: 'Challenges', path: '/challenges' },
  { name: 'Archive', path: 'https://github.com/blackb6a/intensive-study/' },
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Mount component to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-background/50 backdrop-blur-md">
      <div className="mx-auto max-w-(--breakpoint-md) px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Logo />

          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden items-center gap-4 text-sm sm:gap-6 md:flex">
              {mounted && navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-block duration-300 ease-in-out capitalize transition-colors ${
                    pathname === item.path || pathname.startsWith(`${item.path}/`)
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground/80'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/50 h-9 w-9"
                title="Menu"
                type="button"
                suppressHydrationWarning
              >
                <span className="sr-only">Toggle menu</span>
                <Menu className="h-4 w-4" />
              </button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
