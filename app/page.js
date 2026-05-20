"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [splashGone, setSplashGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const graphicImage = document.querySelector(".red-mark img");
    const portraitImage = document.querySelector(".portrait");

    let raf = null;
    let loop = null;
    let targetGraphic = 0;
    let currentGraphic = 0;
    let targetPortrait = 0;
    let currentPortrait = 0;

    const finishSplash = () => {
      setSplashLeaving(true);
      window.setTimeout(() => {
        document.querySelector(".site")?.classList.add("is-ready");
        setSplashGone(true);
      }, 760);
    };

    const waitForLoad = async () => {
      const minTime = new Promise((resolve) => window.setTimeout(resolve, 1700));
      const images = Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });

      await Promise.all([minTime, ...images]);
      if (document.readyState === "complete") finishSplash();
      else window.addEventListener("load", finishSplash, { once: true });
    };

    const handlePointer = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    };

    const updateTargets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth <= 800;
      targetGraphic = scrollY * (isMobile ? -0.18 : -0.105);
      targetPortrait = scrollY * (isMobile ? -0.035 : -0.055);
      raf = null;
    };

    const handleScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateTargets);
    };

    const animate = () => {
      currentGraphic += (targetGraphic - currentGraphic) * 0.075;
      currentPortrait += (targetPortrait - currentPortrait) * 0.06;

      if (graphicImage) {
        graphicImage.style.transform = `translate3d(-50%, ${currentGraphic.toFixed(2)}px, 0)`;
      }

      if (portraitImage) {
        portraitImage.style.transform = `translate3d(0, ${currentPortrait.toFixed(2)}px, 0)`;
      }

      loop = requestAnimationFrame(animate);
    };

    waitForLoad();
    updateTargets();
    animate();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
      if (raf) cancelAnimationFrame(raf);
      if (loop) cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <>
      {!splashGone && (
        <div className={splashLeaving ? "splash is-leaving" : "splash"}>
          <div className="splash-name">IZAK<br />HYLLESTED</div>
        </div>
      )}

      <Nav />

      <main className="main site">
        <section className="hero">
          <div className="red-mark" aria-hidden="true">
            <img src="/hero-graphic.png" alt="" />
          </div>

          <div className="hero-meta reveal reveal-1">
            <span>00 / MMXXVI</span>
            <span>Copenhagen</span>
          </div>

          <div className="hero-title-wrap reveal reveal-2">
            <h1 className="hero-title">Graphic<br />Designer &<br />Creative<br />Developer</h1>
          </div>

          <div className="hero-grid reveal reveal-4">
            <div><div className="label">WHO</div><p>Izak Hyllested</p></div>
            <div><div className="label">WHAT</div><p>Interactive Systems<br />Identity<br />Frontend</p></div>
            <div><div className="label">WHEN</div><p>Available</p></div>
            <div><div className="label">HOW</div><p>Design + Code</p></div>
          </div>
        </section>

        <section className="portrait-section reveal">
          <img src="/profile.jpg" className="portrait" alt="Izak Hyllested" />
          <div className="portrait-caption">
            <span>Portrait / Profile</span>
            <span>Graphic Design + Web Development</span>
          </div>
        </section>

        <section className="projects-section">
          <div className="section-top reveal">
            <span>01 / SELECTED WORK</span>
            <Link href="/projects">Full Archive →</Link>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="about-strip reveal" id="about">
          <p>I build visual systems, mobile-first web apps, editorial interfaces and experimental digital identities with a focus on typography, atmosphere and interaction.</p>
          <a href="mailto:izakhyllested@icloud.com">Start a project →</a>
        </section>
      </main>
    </>
  );
}
