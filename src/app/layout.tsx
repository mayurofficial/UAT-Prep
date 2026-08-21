import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "UTET 2026/2027 Master Prep | Anjali's Learning Hub",
  description: "Bilingual interactive preparation portal, concept mastery engine, and 150-question mock test simulator for Uttarakhand Teacher Eligibility Test (UTET).",
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
