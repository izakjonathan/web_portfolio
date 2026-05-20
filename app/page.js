'use client';

import { useEffect } from 'react';
import Nav from '../components/Nav';
import ProjectRow from '../components/ProjectRow';
import { projects } from '../data/projects';

export default function Home() {

  useEffect(() => {
    document.querySelector('.site')?.classList.add('is-ready');

    const root = document.documentElement;

    const onScroll = () => {
      root.style.setProperty('--scroll-offset', window.scrollY + 'px');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <Nav />

      <main className="main site">

        <section className="hero">

          <div className="red-mark">
            <img src="/hero-graphic.png" alt="" />
          </div>

          <div className="hero-meta">
            <span>00 / MMXXVI</span>
            <span>Copenhagen</span>
          </div>

          <h1 className="hero-title">
            Graphic<br />
            Designer &<br />
            Creative<br />
            Developer
          </h1>

        </section>

        <section className="portrait-section">
          <img
            src="/profile.jpg"
            alt="Izak Hyllested"
            className="portrait"
          />
        </section>

        <section className="projects-section">
          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow
                key={index}
                project={project}
              />
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
