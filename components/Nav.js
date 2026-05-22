import Link from "next/link";

export default function Nav() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo contrast-text">
            IZAK HYLLESTED
          </Link>

          <a href="#about" className="contrast-text">
            ABOUT
          </a>
        </div>
      </header>

      <footer className="footer-nav">
        <div className="footer-inner">
          <a href="mailto:izakhyllested@icloud.com" className="contrast-text">
            CONTACT
          </a>

          <Link href="/projects" className="contrast-text">
            PROJECTS
          </Link>
        </div>
      </footer>
    </>
  );
}
