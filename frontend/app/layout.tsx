import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Databuddy } from '@databuddy/sdk';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UC iCalendar Tool",
  description: "A simple tool for importing your University of Cincinnati course schedule into Apple Calendar, Google Calendar, and other calendars that accept .ics files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Databuddy
          clientId={process.env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID!}
          enableBatching={true}
          trackScreenViews
          trackPerformance
          trackWebVitals={true}
          trackErrors={true}
        />
      </body>
    </html>
  );
}
