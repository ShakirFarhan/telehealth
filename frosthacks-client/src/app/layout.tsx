import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

// Context API
import AppState from '@/context/AppContext';

const poppins = Poppins({ subsets: ['latin'], weight: ["100", "300", "500", "700"] });

export const metadata: Metadata = {
  title: 'Web Portal |  Technologies',
  description: 'Live emergency cases Dashboard for  Hospitals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppState>{children}</AppState>
      </body>
    </html>
  );
}
