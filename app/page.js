"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    let currentScroll = window.scrollY || window.pageYOffset || 0;
    let targetScroll = currentScroll;
    let currentProfile = 0;
    let targetProfile = 0;
    let raf = 0;
    let loaded = false;

    const setVars = () => {
      const isMobile = window.innerWidth <= 800;

      targetScroll = (window.scrollY || window.pageYOffset || 0) * (isMobile ? -0.16 : -0.10);
      targetProfile = (window.scrollY || window.pageYOffset || 0) * (isMobile ? -0.035 : -0.05);

      currentScroll += (targetScroll - currentScroll) * 0.09;
      currentProfile += (targetProfile - currentProfile) * 0.075;

      root.style.setProperty("--graphic-y", `${currentScroll.toFixed(2)}px`);
      root.style.setProperty("--profile-y", `${currentProfile.toFixed(2)}px`);

      raf = requestAnimationFrame(setVars);
    };

    const handlePointer = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    };

    const finishLoading = () => {
      if (loaded) return;
      loaded = true;

      setLeaving(true);

      window.setTimeout(() => {
        document.querySelector(".site")?.classList.add("is-ready");
        setHidden(true);
      }, 950);
    };

    const waitForEverything = async () => {
      const minimumSplash = new Promise((resolve) => window.setTimeout(resolve, 1800));

      const imagePromises = Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });

      await Promise.all([minimumSplash, ...imagePromises]);

      if (document.readyState === "complete") {
        finishLoading();
      } else {
        window.addEventListener("load", finishLoading, { once: true });
      }
    };

    raf = requestAnimationFrame(setVars);
    waitForEverything();

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", () => {}, { passive: true });
    window.addEventListener("resize", () => {}, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  return (
    <>
      {!hidden && (
        <div className={leaving ? "splash is-leaving" : "splash"} aria-hidden="true">
          <div className="splash-name">
            IZAK
            <br />
            HYLLESTED
          </div>
        </div>
      )}

      <Nav />

      <main className="main site">
        <section className="hero">
          <div className="red-mark" aria-hidden="true">
            <img src="/hero-graphic.png" alt="" className="red-mark-image" />
          </div>

          <div className="hero-meta reveal reveal-1">
            <span>00 / MMXXVI</span>
            <span>Copenhagen</span>
          </div>

          <div className="hero-title-wrap reveal reveal-title">
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

          <div className="hero-grid reveal reveal-4">
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
          <p>
            I build visual systems, mobile-first web apps, editorial interfaces
            and experimental digital identities with a focus on typography,
            atmosphere and interaction.
          </p>

          <a href="mailto:izakhyllested@icloud.com">Start a project →</a>
        </section>
      </main>
    </>
  );
}
