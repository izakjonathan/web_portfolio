import Link from 'next/link';

export function Nav() {
  return (
    <header className="nav-wrap">
      <Link className="brand" href="/" aria-label="Home">
        <span className="brand-mark">IH</span>
        <span>Izak Studio</span>
      </Link>
      <nav>
        <Link href="/projects">Projects</Link>
        <Link href="/lab">Lab</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
