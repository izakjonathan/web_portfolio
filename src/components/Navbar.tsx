import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "24px",
        padding: "24px",
        position: "sticky",
        top: 0,
        backdropFilter: "blur(20px)",
        background: "rgba(0,0,0,0.5)",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
}