"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [splashGone, setSplashGone] = useState(false);

  const graphicRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const graphic = graphicRef.current;
    const portrait = portraitRef.current;

    /*
      TRUE BLACK/WHITE LUMINANCE CONTRAST
      -----------------------------------
      This does not use mix-blend-mode.
      It samples the actual hero graphic pixels behind each text element and
      sets text to pure black or pure white only.
    */

    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
    const sampleImage = new Image();
    let samplerReady = false;

    sampleImage.onload = () => {
      if (!sampleCtx) return;

      sampleCanvas.width = sampleImage.naturalWidth;
      sampleCanvas.height = sampleImage.naturalHeight;
      sampleCtx.drawImage(sampleImage, 0, 0);
      samplerReady = true;
      updateContrast();
    };

    sampleImage.src = "/hero-graphic.png";

    const getGraphicLuminanceAtPoint = (clientX, clientY) => {
      if (!samplerReady || !sampleCtx || !graphic) return null;

      const rect = graphic.getBoundingClientRect();

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

      const pixel = sampleCtx.getImageData(x, y, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];
      const a = pixel[3];

      if (a < 30) return null;

      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    };

    const updateContrast = () => {
      const items = Array.from(document.querySelectorAll(".contrast-text"));

      items.forEach((el) => {
        const rect = el.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const points = [
          [rect.left + rect.width * 0.2, rect.top + rect.height * 0.5],
          [rect.left + rect.width * 0.5, rect.top + rect.height * 0.5],
          [rect.left + rect.width * 0.8, rect.top + rect.height * 0.5]
        ];

        const samples = points
          .map(([x, y]) => getGraphicLuminanceAtPoint(x, y))
          .filter((value) => typeof value === "number");

        const luminance = samples.length
          ? samples.reduce((sum, value) => sum + value, 0) / samples.length
          : 0;

        el.style.color = luminance > 0.52 ? "#050505" : "#ffffff";
      });
    };

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

      targetGraphicY = scrollY * (isMobile ? -0.12 : -0.075);
      targetPortraitY = scrollY * (isMobile ? -0.025 : -0.035);

      raf = null;
    };

    const animate = () => {
      if (!running) return;

      currentGraphicY += (targetGraphicY - currentGraphicY) * 0.055;
      currentPortraitY += (targetPortraitY - currentPortraitY) * 0.045;

      if (graphic) {
        graphic.style.transform =
          `translate3d(-50%, ${currentGraphicY.toFixed(2)}px, 0)`;
      }

      if (portrait) {
        portrait.style.transform =
          `translate3d(0, ${currentPortraitY.toFixed(2)}px, 0)`;
      }

      updateContrast();

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

      window.setTimeout(() => {
        document.querySelector(".site")?.classList.add("is-ready");
        setSplashGone(true);
        updateContrast();
      }, 820);
    };

    const waitForPage = async () => {
      const minimumTime = new Promise((resolve) => {
        window.setTimeout(resolve, 1850);
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
    animate();
    waitForPage();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      running = false;

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
            <img
              ref={graphicRef}
              src="/hero-graphic.png"
              alt=""
              className="red-mark-image"
            />
          </div>

          <div className="hero-meta reveal reveal-1">
            <span className="contrast-text">00 / MMXXVI</span>
            <span className="contrast-text">Copenhagen</span>
          </div>

          <div className="hero-title-wrap reveal reveal-2">
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
          <img
            ref={portraitRef}
            src="/profile.jpg"
            className="portrait"
            alt="Izak Hyllested"
          />

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
