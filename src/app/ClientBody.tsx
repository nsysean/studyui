"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering when component is mounted
  useEffect(() => {
    setMounted(true);
    // Remove any extension-added classes during hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <body
      className="box-border flex h-fit min-h-screen flex-col gap-y-6 font-sans antialiased"
      suppressHydrationWarning
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* Only render children after mounting to prevent hydration mismatch */}
        <div suppressHydrationWarning>{mounted ? children : null}</div>
      </ThemeProvider>
    </body>
  );
}
