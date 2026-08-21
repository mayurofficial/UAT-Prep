import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Anjali Teacher Hub | UTET & UKSSSC LT Grade Prep Portal",
  description: "Bilingual interactive preparation portal, concept mastery engine, and solved mock tests for Uttarakhand Teacher Eligibility Test (UTET) and UKSSSC Assistant Teacher (LT Grade) exams.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a73e8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" data-theme="light" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
