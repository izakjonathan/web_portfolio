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
  const graphicImageRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;

    const getGraphic = () =>
      graphicRef.current || document.querySelector(".red-mark");

    const getGraphicImage = () =>
      graphicImageRef.current || document.querySelector(".red-mark-image");

    const getPortrait = () =>
      portraitRef.current || document.querySelector(".portrait");

    let running = true;
    let raf = null;
    let loop = null;

    let targetGraphicY = 0;
    let currentGraphicY = 0;

    let targetPortraitY = 0;
    let currentPortraitY = 0;

    /*
      HARD CONTRAST FIX
      This does not rely on CSS blend modes. Every .blend-text node is split
      into character spans, then each visible character receives the inverse
      of the actual hero graphic pixel behind it. That matches white text with
      difference blending, but avoids Safari/iOS stacking-context failures.
    */

    const contrastCanvas = document.createElement("canvas");
    const contrastCtx = contrastCanvas.getContext("2d", { willReadFrequently: true });
    const contrastImage = new Image();

    let contrastReady = false;
    let textWrapped = false;

    const wrapBlendText = () => {
      if (textWrapped) return;

      const elements = Array.from(document.querySelectorAll(".blend-text"));

      const wrapTextNode = (textNode) => {
        const text = textNode.nodeValue;
        if (!text || text.length === 0) return;

        const fragment = document.createDocumentFragment();

        Array.from(text).forEach((char) => {
          const span = document.createElement("span");
          span.className = "blend-char";
          span.textContent = char;
          fragment.appendChild(span);
        });

        textNode.parentNode.replaceChild(fragment, textNode);
      };

      const walk = (node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            wrapTextNode(child);
            return;
          }

          if (
            child.nodeType === Node.ELEMENT_NODE &&
            child.tagName !== "BR" &&
            child.tagName !== "SCRIPT" &&
            child.tagName !== "STYLE" &&
            !child.classList.contains("blend-char")
          ) {
            walk(child);
          }
        });
      };

      elements.forEach((element) => {
        if (element.dataset.blendWrapped === "true") return;
        walk(element);
        element.dataset.blendWrapped = "true";
      });

      textWrapped = true;
    };

    contrastImage.onload = () => {
      if (!contrastCtx) return;

      contrastCanvas.width = contrastImage.naturalWidth;
      contrastCanvas.height = contrastImage.naturalHeight;
      contrastCtx.drawImage(contrastImage, 0, 0);
      contrastReady = true;

      wrapBlendText();
      updateContrastText();
    };

    contrastImage.src = "/hero-graphic.png";

    const getGraphicPixelAtPoint = (clientX, clientY) => {
      if (!contrastReady || !contrastCtx) return null;

      const img = getGraphicImage();
      if (!img) return null;

      const rect = img.getBoundingClientRect();

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }

      const x = Math.round(((clientX - rect.left) / rect.width) * contrastCanvas.width);
      const y = Math.round(((clientY - rect.top) / rect.height) * contrastCanvas.height);

      if (x < 0 || y < 0 || x >= contrastCanvas.width || y >= contrastCanvas.height) {
        return null;
      }

      const pixel = contrastCtx.getImageData(x, y, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];
      const a = pixel[3];

      if (a < 24) return null;

      return { r, g, b };
    };

    const updateContrastText = () => {
      if (!contrastReady) return;

      const chars = Array.from(document.querySelectorAll(".blend-char"));

      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const x = rect.left + rect.width * 0.5;
        const y = rect.top + rect.height * 0.52;

        const pixel = getGraphicPixelAtPoint(x, y);

        if (!pixel) {
          char.style.color = "#ffffff";
          return;
        }

        char.style.color = `rgb(${255 - pixel.r}, ${255 - pixel.g}, ${255 - pixel.b})`;
      });
    };

    const updateTargets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth <= 800;

      targetGraphicY = scrollY * (isMobile ? -0.42 : -0.28);
      targetPortraitY = scrollY * (isMobile ? -0.10 : -0.08);

      raf = null;
    };

    const animate = () => {
      if (!running) return;

      const graphic = getGraphic();
      const portrait = getPortrait();

      currentGraphicY += (targetGraphicY - currentGraphicY) * 0.10;
      currentPortraitY += (targetPortraitY - currentPortraitY) * 0.075;

      if (graphic) {
        graphic.style.transform = `translate3d(0, ${currentGraphicY.toFixed(2)}px, 0)`;
      }

      if (portrait) {
        portrait.style.transform = `translate3d(0, ${currentPortraitY.toFixed(2)}px, 0)`;
      }

      updateContrastText();

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
        wrapBlendText();
        updateContrastText();
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
    wrapBlendText();
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

      <Nav />

      <div ref={graphicRef} className="red-mark" aria-hidden="true">
        <img
          ref={graphicImageRef}
          src="/hero-graphic.png"
          alt=""
          className="red-mark-image"
        />
      </div>

      <main className="main site">
        <section className="hero">
          <div className="hero-meta reveal reveal-1">
            <span className="blend-text">00 / MMXXVI</span>
            <span className="blend-text">Copenhagen</span>
          </div>

          <div className="hero-title-wrap reveal reveal-2">
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

          <div className="hero-grid reveal reveal-4">
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

        <section className="portrait-section reveal">
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
          <div className="section-top reveal">
            <span className="blend-text">01 / SELECTED WORK</span>
            <Link href="/projects" className="blend-text">
              Full Archive →
            </Link>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="about-strip reveal" id="about">
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
