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

    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
    const sampleImage = new Image();

    let samplerReady = false;

    sampleImage.onload = () => {
      sampleCanvas.width = sampleImage.naturalWidth;
      sampleCanvas.height = sampleImage.naturalHeight;
      sampleCtx.drawImage(sampleImage, 0, 0);
      samplerReady = true;
      updateContrast();
    };

    sampleImage.src = "/hero-graphic.png";

    const getGraphicLuminanceAtPoint = (clientX, clientY) => {
      const heroImage = document.querySelector(".red-mark-image");

      if (!samplerReady || !heroImage || !sampleCtx) return null;

      const rect = heroImage.getBoundingClientRect();

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }

      const x = Math.round(((clientX - rect.left) / rect.width) * sampleCanvas.width);
      const y = Math.round(((clientY - rect.top) / rect.height) * sampleCanvas.height);

      if (x < 0 || y < 0 || x >= sampleCanvas.width || y >= sampleCanvas.height) {
        return null;
      }

      const data = sampleCtx.getImageData(x, y, 1, 1).data;
      const r = data[0];
      const g = data[1];
      const b = data[2];
      const a = data[3];

      if (a < 24) return null;

      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    };

    const updateContrast = () => {
      const items = Array.from(document.querySelectorAll(".contrast-text"));

      items.forEach((el) => {
        const rect = el.getBoundingClientRect();

        const points = [
          [rect.left + rect.width * 0.18, rect.top + rect.height * 0.5],
          [rect.left + rect.width * 0.5, rect.top + rect.height * 0.5],
          [rect.left + rect.width * 0.82, rect.top + rect.height * 0.5]
        ];

        const samples = points
          .map(([x, y]) => getGraphicLuminanceAtPoint(x, y))
          .filter((value) => typeof value === "number");

        const average = samples.length
          ? samples.reduce((sum, value) => sum + value, 0) / samples.length
          : 0;

        el.style.color = average > 0.56 ? "#050505" : "#ffffff";
      });
    };

    const updateTargets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth <= 800;

      targetGraphicY = scrollY * (isMobile ? -0.18 : -0.11);
      targetProfileY = scrollY * (isMobile ? -0.035 : -0.045);

      raf = null;
    };

    const render = () => {
      if (!running) return;

      currentGraphicY += (targetGraphicY - currentGraphicY) * 0.085;
      currentProfileY += (targetProfileY - currentProfileY) * 0.065;

      root.style.setProperty("--graphic-y", `${currentGraphicY.toFixed(2)}px`);
      root.style.setProperty("--profile-y", `${currentProfileY.toFixed(2)}px`);

      updateContrast();

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
        updateContrast();
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
            <span className="contrast-text">00 / MMXXVI</span>
            <span className="contrast-text">Copenhagen</span>
          </div>

          <div className="hero-title-wrap reveal reveal-title">
            <h1 className="hero-title contrast-text">
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
              <div className="label contrast-text">WHO</div>
              <p className="contrast-text">Izak Hyllested</p>
            </div>

            <div>
              <div className="label contrast-text">WHAT</div>
              <p className="contrast-text">
                Interactive Systems
                <br />
                Identity
                <br />
                Frontend
              </p>
            </div>

            <div>
              <div className="label contrast-text">WHEN</div>
              <p className="contrast-text">Available</p>
            </div>

            <div>
              <div className="label contrast-text">HOW</div>
              <p className="contrast-text">Design + Code</p>
            </div>
          </div>
        </section>

        <section className="portrait-section reveal">
          <img src="/profile.jpg" className="portrait" alt="Izak Hyllested" />

          <div className="portrait-caption">
            <span className="contrast-text">Portrait / Profile</span>
            <span className="contrast-text">Graphic Design + Web Development</span>
          </div>
        </section>

        <section className="projects-section">
          <div className="section-top reveal">
            <span className="contrast-text">01 / SELECTED WORK</span>
            <Link href="/projects" className="contrast-text">Full Archive →</Link>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="about-strip reveal" id="about">
          <p className="contrast-text">
            I build visual systems, mobile-first web apps, editorial interfaces
            and experimental digital identities with a focus on typography,
            atmosphere and interaction.
          </p>

          <a href="mailto:izakhyllested@icloud.com" className="contrast-text">Start a project →</a>
        </section>
      </main>
    </>
  );
}
