"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [splashGone, setSplashGone] = useState(false);

  const portraitRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;

    let running = true;
    let raf = null;
    let loop = null;

    let targetGraphicY = 0;
    let currentGraphicY = 0;

    let targetPortraitY = 0;
    let currentPortraitY = 0;

    const updateTargets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth <= 800;

      targetGraphicY = scrollY * (isMobile ? -0.16 : -0.12);
      targetPortraitY = scrollY * (isMobile ? -0.08 : -0.06);

      raf = null;
    };

    const animate = () => {
      if (!running) return;

      currentGraphicY += (targetGraphicY - currentGraphicY) * 0.09;
      currentPortraitY += (targetPortraitY - currentPortraitY) * 0.07;

      root.style.setProperty("--graphic-y", `${currentGraphicY.toFixed(2)}px`);

      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(0, ${currentPortraitY.toFixed(2)}px, 0)`;
      }

      loop = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(updateTargets);
      }
    };

    const handlePointer = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    };

    const finishSplash = () => {
      setSplashLeaving(true);
      window.setTimeout(() => setSplashGone(true), 820);
    };

    const waitForPage = async () => {
      const minimumTime = new Promise((resolve) => window.setTimeout(resolve, 1850));
      const imageLoads = Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });

      await Promise.all([minimumTime, ...imageLoads]);

      if (document.readyState === "complete") {
        finishSplash();
      } else {
        window.addEventListener("load", finishSplash, { once: true });
      }
    };

    updateTargets();
    animate();
    waitForPage();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("orientationchange", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      running = false;

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("orientationchange", handleScroll);
      window.removeEventListener("pointermove", handlePointer);

      if (raf) cancelAnimationFrame(raf);
      if (loop) cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <>
      {!splashGone && (
        <div className={splashLeaving ? "splash is-leaving" : "splash"}>
          <div className="splash-name">
            IZAK
            <br />
            HYLLESTED
          </div>
        </div>
      )}

      <div className="red-mark" aria-hidden="true">
        <img src="/hero-graphic.png" alt="" className="red-mark-image" />
      </div>

      <Nav />

      <main className="main site">
        <section className="hero">
          <div className="hero-meta">
            <span className="blend-text">00 / MMXXVI</span>
            <span className="blend-text">Copenhagen</span>
          </div>

          <div className="hero-title-wrap">
            <h1 className="hero-title blend-text">
              Graphic
              <br />
              Designer &
              <br />
              Creative
              <br />
              Developer
            </h1>
          </div>

          <div className="hero-grid">
            <div>
              <div className="label blend-text">WHO</div>
              <p className="blend-text">Izak Hyllested</p>
            </div>

            <div>
              <div className="label blend-text">WHAT</div>
              <p className="blend-text">
                Interactive Systems
                <br />
                Identity
                <br />
                Frontend
              </p>
            </div>

            <div>
              <div className="label blend-text">WHEN</div>
              <p className="blend-text">Available</p>
            </div>

            <div>
              <div className="label blend-text">HOW</div>
              <p className="blend-text">Design + Code</p>
            </div>
          </div>
        </section>

        <section className="portrait-section">
          <img
            ref={portraitRef}
            src="/profile.jpg"
            className="portrait"
            alt="Izak Hyllested"
          />

          <div className="portrait-caption">
            <span className="blend-text">Portrait / Profile</span>
            <span className="blend-text">Graphic Design + Web Development</span>
          </div>
        </section>

        <section className="projects-section">
          <div className="section-top">
            <span className="blend-text">01 / SELECTED WORK</span>
            <Link href="/projects" className="blend-text">Full Archive →</Link>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="about-strip" id="about">
          <p className="blend-text">
            I build visual systems, mobile-first web apps, editorial interfaces
            and experimental digital identities with a focus on typography,
            atmosphere and interaction.
          </p>

          <a href="mailto:izakhyllested@icloud.com" className="blend-text">
            Start a project →
          </a>
        </section>
      </main>
    </>
  );
}
