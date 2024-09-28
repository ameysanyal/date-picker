import './globals.css';
import { DateProvider } from '@/context/dateContext.js';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Date Picker',
  description: 'Recurring Date Picker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <DateProvider>
        <body className={inter.className}>{children}</body>
      </DateProvider>
    </html>
  );
}
