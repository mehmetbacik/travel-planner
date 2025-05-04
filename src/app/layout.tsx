import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/main.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travel Planner",
  description:
    "Travel Planner helps you create personalized travel plans automatically based on your travel dates and routes. It provides weather, transportation, event, and dining recommendations, all in one downloadable PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
