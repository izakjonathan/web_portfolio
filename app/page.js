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

    const setViewport = () => {
      root.style.setProperty("--app-height", `${window.innerHeight}px`);
      root.style.setProperty("--vv-top", `${window.visualViewport?.offsetTop || 0}px`);
    };

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
      if (!raf) raf = requestAnimationFrame(updateTargets);
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
      const minimumTime = new Promise((resolve) => window.setTimeout(resolve, 1200));
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

    setViewport();
    updateTargets();
    animate();
    waitForPage();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", () => { setViewport(); handleScroll(); }, { passive: true });
    window.addEventListener("orientationchange", () => { setViewport(); handleScroll(); }, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setViewport, { passive: true });
      window.visualViewport.addEventListener("scroll", setViewport, { passive: true });
    }

    return () => {
      running = false;

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", setViewport);
      window.removeEventListener("orientationchange", setViewport);
      window.removeEventListener("pointermove", handlePointer);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setViewport);
        window.visualViewport.removeEventListener("scroll", setViewport);
      }

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

      <div className="app-layers">
        <div className="l4-image-layer" aria-hidden="true">
          <img
            ref={portraitRef}
            src="/profile.jpg"
            alt=""
            className="portrait"
          />
        </div>

        <div className="l4-color-graphic-layer" aria-hidden="true">
          <img src="/hero-graphic.png" alt="" className="l3-graphic-image" />
        </div>

        <main className="main l2-text-layer content-blend">
          <section className="hero">
            <div className="hero-meta">
              <span>00 / MMXXVI</span>
              <span>Copenhagen</span>
            </div>

            <div className="hero-title-wrap">
              <h1 className="hero-title">
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
                <div className="label">WHO</div>
                <p>Izak Hyllested</p>
              </div>

              <div>
                <div className="label">WHAT</div>
                <p>
                  Interactive Systems
                  <br />
                  Identity
                  <br />
                  Frontend
                </p>
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
            <div className="portrait-spacer" />

            <div className="portrait-caption">
              <span>Portrait / Profile</span>
              <span>Graphic Design + Web Development</span>
            </div>
          </section>

          <section className="projects-section">
            <div className="section-top">
              <span>01 / SELECTED WORK</span>
              <Link href="/projects">Full Archive →</Link>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <ProjectRow key={project.title} project={project} index={index} />
              ))}
            </div>
          </section>

          <section className="about-strip" id="about">
            <p>
              I build visual systems, mobile-first web apps, editorial interfaces
              and experimental digital identities with a focus on typography,
              atmosphere and interaction.
            </p>

            <a href="mailto:izakhyllested@icloud.com">
              Start a project →
            </a>
          </section>
        </main>
<div className="l3-blendmap-layer" aria-hidden="true"><img src="/hero-graphic.png" className="blendmap-image" alt="" /></div>

        <div className="l1-menu-layer">
          <Nav />
        </div>
      </div>
    </>
  );
}
