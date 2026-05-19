import Link from "next/link";

export default function Nav() {
  return (
    <header className="nav">
      <Link href="/" className="nav-logo">Izak Hyllested</Link>
      <nav className="nav-links">
        <Link href="/projects">Projects</Link>
        <a href="mailto:izakhyllested@icloud.com">Contact</a>
      </nav>
    </header>
  );
}
