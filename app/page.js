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

    let raf = null;
    let loop = null;
    let running = true;

    let targetGraphicY = 0;
    let currentGraphicY = 0;
    let targetProfileY = 0;
    let currentProfileY = 0;

    const updateTargets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth <= 800;

      targetGraphicY = scrollY * (isMobile ? -0.20 : -0.12);
      targetProfileY = scrollY * (isMobile ? -0.045 : -0.055);

      raf = null;
    };

    const render = () => {
      if (!running) return;

      currentGraphicY += (targetGraphicY - currentGraphicY) * 0.085;
      currentProfileY += (targetProfileY - currentProfileY) * 0.065;

      root.style.setProperty("--graphic-y", `${currentGraphicY.toFixed(2)}px`);
      root.style.setProperty("--profile-y", `${currentProfileY.toFixed(2)}px`);

      loop = requestAnimationFrame(render);
    };

    const requestTargetUpdate = () => {
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

      window.setTimeout(() => {
        document.querySelector(".site")?.classList.add("is-ready");
        setSplashGone(true);
      }, 900);
    };

    const waitForContent = async () => {
      const minimumTime = new Promise((resolve) => {
        window.setTimeout(resolve, 1800);
      });

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
    render();
    waitForContent();

    window.addEventListener("scroll", requestTargetUpdate, { passive: true });
    window.addEventListener("touchmove", requestTargetUpdate, { passive: true });
    window.addEventListener("resize", requestTargetUpdate, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      running = false;

      window.removeEventListener("scroll", requestTargetUpdate);
      window.removeEventListener("touchmove", requestTargetUpdate);
      window.removeEventListener("resize", requestTargetUpdate);
      window.removeEventListener("pointermove", handlePointer);

      if (raf) cancelAnimationFrame(raf);
      if (loop) cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <>
      {!splashGone && (
        <div className={splashLeaving ? "splash is-leaving" : "splash"} aria-hidden="true">
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
