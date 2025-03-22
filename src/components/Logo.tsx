import React from 'react';
import Link from 'next/link';

// Use a regular component (not client component) for the logo
// since it doesn't have any client-side behavior
export const Logo = () => {
  return (
    <Link
      href="/"
      className="ease-in-out flex shrink-0 items-center gap-2 text-xl font-semibold transition-colors duration-300 hover:text-primary"
      suppressHydrationWarning
    >
      %
    </Link>
  );
};
