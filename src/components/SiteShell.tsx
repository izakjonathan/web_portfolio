import Link from "next/link";
import { ReactNode } from "react";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050505",
      color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      <nav style={{
        display: "flex",
        gap: "24px",
        padding: "24px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        backdropFilter: "blur(20px)",
        background: "rgba(0,0,0,0.5)"
      }}>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/lab">Lab</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <main style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}