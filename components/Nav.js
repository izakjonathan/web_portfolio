import Link from "next/link";

export default function Nav() {
  return (
    <>
      <header className="nav chrome">
        <div className="chrome-inner">
          <Link href="/" className="nav-logo">IZAK HYLLESTED</Link>
          <a href="#about">ABOUT</a>
        </div>
      </header>

      <footer className="footer-nav chrome">
        <div className="chrome-inner">
          <a href="mailto:izakhyllested@icloud.com">CONTACT</a>
          <Link href="/projects">PROJECTS</Link>
        </div>
      </footer>
    </>
  );
}
