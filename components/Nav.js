import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <Link className="logo" href="/">Izak Hyllested</Link>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
      </div>
    </nav>
  );
}
