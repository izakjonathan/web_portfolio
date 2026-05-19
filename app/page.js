"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { projects } from "../data/projects";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showSplash && (
        <div className="splash">
          <div className="splash-name">Izak Hyllested</div>
        </div>
      )}

      <Nav />

      <main className="main">
        <section className="hero">
          <div className="hero-meta">
            <span>00 / MMXXVI</span>
            <span>Copenhagen</span>
          </div>

          <h1>
            Graphic
            <br />
            Design &
            <br />
            Web Development
          </h1>

          <div className="red-mark" />

          <div className="hero-grid">
            <div>
              <div className="label">WHO</div>
              <p>Izak Hyllested</p>
            </div>

            <div>
              <div className="label">WHAT</div>
              <p>Interactive Systems<br/>Identity<br/>Frontend</p>
            </div>

            <div>
              <div className="label">WHEN</div>
              <p>Available</p>
            </div>

            <div>
              <div className="label">HOW</div>
              <p>Design + Code</p>
            </div>
          </div>
        </section>

        <section className="portrait-section">
          <img src="/profile.jpg" className="portrait" />
        </section>

        <section className="projects-section">
          <div className="section-top">
            <span>01 / SELECTED WORK</span>
          </div>

          {projects.map((project, i) => (
            <div className="project-row" key={i}>
              <span>{String(i+1).padStart(2,"0")}</span>
              <h2>{project}</h2>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}