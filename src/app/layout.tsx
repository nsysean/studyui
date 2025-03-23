import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { satoshiFont } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ʕ•ᴥ•ʔ | Black Bauhinia",
  description: "ʕ•ᴥ•ʔ - An experimental CTF co-learning project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${satoshiFont.variable}`} suppressHydrationWarning>
      <ClientBody>
        <Header />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </ClientBody>
    </html>
  );
}
