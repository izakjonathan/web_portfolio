import "./globals.css";

export const metadata = {
  title: "Izak Hyllested",
  description: "Graphic Designer & Creative Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}