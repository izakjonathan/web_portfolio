import "./globals.css";

export const metadata = {
  title: "Izak Hyllested — Creative Developer",
  description: "Portfolio for graphic design, web development and immersive interfaces."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="background" />
        {children}
      </body>
    </html>
  );
}
