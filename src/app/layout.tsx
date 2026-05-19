import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Izak Hyllested — Creative Developer & Designer',
  description: 'Portfolio for graphic design, web development, interface systems, and immersive digital experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
