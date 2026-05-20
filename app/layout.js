import "./globals.css";
import MotionShell from "../components/MotionShell";

export const metadata = {
  title: "Izak Hyllested",
  description: "Graphic Design & Web Development"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MotionShell>
          {children}
        </MotionShell>
      </body>
    </html>
  );
}
