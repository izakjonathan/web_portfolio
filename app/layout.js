import "./globals.css";

export const metadata = {
  title: "Izak Hyllested",
  description: "Graphic Design & Web Development"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}