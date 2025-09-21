import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { Analytics } from '@/components/analytics';

export const metadata: Metadata = {
  title: {
    template: '%s | HU↔UK Relocation Portal',
    default: 'HU↔UK Relocation Portal'
  },
  description: 'Bilingual relocation guidance for moving between Hungary and the UK.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
