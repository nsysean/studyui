"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Challenges', path: '/challenges' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Archive', path: 'https://github.com/blackb6a/intensive-study/' },
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Mount component to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-(--breakpoint-md) px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Logo />

          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Navigation */}
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
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondary/50 h-9 w-9"
                title={mobileMenuOpen ? "Close menu" : "Open menu"}
                type="button"
                suppressHydrationWarning
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && mounted && (
          <div className="md:hidden py-4 border-t border-border animate-in fade-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-2 py-1 transition-colors duration-200 ${
                    pathname === item.path || pathname.startsWith(`${item.path}/`)
                      ? 'text-foreground bg-secondary/50'
                      : 'text-foreground/60 hover:text-foreground hover:bg-secondary/30'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}