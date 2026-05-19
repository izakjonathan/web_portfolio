import "./globals.css";
import Splash from "../components/Splash";

export const metadata = {
  title: "Izak Hyllested — Graphic Design & Web Development",
  description: "Editorial portfolio for graphic design, web development and interactive systems."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Splash />
        {children}
      </body>
    </html>
  );
}
