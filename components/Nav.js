import Link from "next/link";

export default function Nav(){
  return(
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">IZAK HYLLESTED</Link>
        <div className="nav-links">
          <Link href="/projects">Projects</Link>
          <a href="mailto:izakhyllested@icloud.com">Contact</a>
        </div>
      </div>
    </header>
  )
}
