import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './globals.css';
import StoreProvider from '@/store/StoreProvider'; // Import the wrapper

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FinBoard',
  description: 'Customizable Finance Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}