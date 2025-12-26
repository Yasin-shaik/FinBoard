import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import QueryProvider from '@/store/QueryProvider';
import DashboardPreloader from '@/store/DashboardPreloader';
import './globals.css';
import StoreProvider from '@/store/StoreProvider'; 
import { Toaster } from 'react-hot-toast';
import NextThemeProvider  from "@/store/NextThemeProvider"

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider>
            <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <DashboardPreloader />
               {children}
               <Toaster position="bottom-right" />
            </NextThemeProvider>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}