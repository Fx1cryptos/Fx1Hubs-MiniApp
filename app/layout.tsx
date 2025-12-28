import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FX1 Digital Hubs',
  description: 'Fashion × Art × Blockchain on Base',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69401eb7d19763ca26ddc30c" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}