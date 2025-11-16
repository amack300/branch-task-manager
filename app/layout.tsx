import type { Metadata } from 'next';
import { Reddit_Sans } from 'next/font/google';

import { Header } from '@/components/app/layout/header';
import { Footer } from '@/components/app/layout/footer';

import './globals.css';

// Branch specific
const redditSans = Reddit_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Branch Task Manager',
  description: 'Example of a simple task manager built in Next.js',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={`${redditSans.className} antialiased`}>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <div className="flex flex-col container min-h-screen mx-auto">
          <Header />
          <main className="p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
