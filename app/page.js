"use client";

import { useEffect } from "react";
import Link from "next/link";

import Nav from "../components/Nav";
import ProjectRow from "../components/ProjectRow";

import { projects } from "../data/projects";

export default function Home() {

  useEffect(() => {

    const root =
      document.documentElement;

    const graphic =
      document.querySelector(".red-mark");

    /* ---------------------------------
       READY
    --------------------------------- */

    requestAnimationFrame(() => {

      document
        .querySelector(".site")
        ?.classList.add("is-ready");

    });

    /* ---------------------------------
       POINTER PARALLAX
    --------------------------------- */

    const handlePointer = (event) => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      root.style.setProperty(
        "--mx",
        x.toFixed(3)
      );

      root.style.setProperty(
        "--my",
        y.toFixed(3)
      );
    };

    /* ---------------------------------
       TRUE PARALLAX
    --------------------------------- */

    let ticking = false;

    const updateParallax = () => {

      const scrollY =
        window.scrollY || window.pageYOffset;

      /*
        DESKTOP + MOBILE DIFFERENT SPEEDS
      */

      const isMobile =
        window.innerWidth <= 800;

      /*
        NEGATIVE = slower than page
        POSITIVE = faster than page
      */

      const speed =
        isMobile ? -0.42 : -0.18;

      const translateY =
        scrollY * speed;

      /*
        IMPORTANT:
        KEEP X CENTERING INSIDE JS
      */

      if(graphic){

        graphic.style.transform =
          `translate3d(0, ${translateY}px, 0)`;

      }

      /*
        OPTIONAL:
        ALSO UPDATE CSS VARIABLE
      */

      root.style.setProperty(
        "--scroll-offset",
        scrollY.toFixed(2)
      );

      ticking = false;
    };

    const handleScroll = () => {

      if(!ticking){

        requestAnimationFrame(
          updateParallax
        );

        ticking = true;
      }
    };

    /* ---------------------------------
       INITIAL RUN
    --------------------------------- */

    updateParallax();

    /* ---------------------------------
       EVENTS
    --------------------------------- */

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive:true }
    );

    window.addEventListener(
      "touchmove",
      handleScroll,
      { passive:true }
    );

    window.addEventListener(
      "resize",
      handleScroll,
      { passive:true }
    );

    window.addEventListener(
      "pointermove",
      handlePointer,
      { passive:true }
    );

    /* ---------------------------------
       CLEANUP
    --------------------------------- */

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "touchmove",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      window.removeEventListener(
        "pointermove",
        handlePointer
      );
    };

  }, []);

  return (
    <>
      <Nav />

      <main className="main site">

        <section className="hero">

          <div
            className="red-mark"
            aria-hidden="true"
          >
            <img
              src="/hero-graphic.png"
              alt=""
            />
          </div>

          <div className="hero-meta reveal reveal-1">

            <span>
              00 / MMXXVI
            </span>

            <span>
              Copenhagen
            </span>

          </div>

          <div className="hero-title-wrap reveal reveal-2">

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

              <div className="label">
                WHO
              </div>

              <p>
                Izak Hyllested
              </p>

            </div>

            <div>

              <div className="label">
                WHAT
              </div>

              <p>
                Interactive Systems
                <br />
                Identity
                <br />
                Frontend
              </p>

            </div>

            <div>

              <div className="label">
                WHEN
              </div>

              <p>
                Available
              </p>

            </div>

            <div>

              <div className="label">
                HOW
              </div>

              <p>
                Design + Code
              </p>

            </div>

          </div>

        </section>

        <section className="portrait-section reveal">

          <img
            src="/profile.jpg"
            className="portrait"
            alt="Izak Hyllested"
          />

          <div className="portrait-caption">

            <span>
              Portrait / Profile
            </span>

            <span>
              Graphic Design + Web Development
            </span>

          </div>

        </section>

        <section className="projects-section">

          <div className="section-top reveal">

            <span>
              01 / SELECTED WORK
            </span>

            <Link href="/projects">
              Full Archive →
            </Link>

          </div>

          <div className="project-list">

            {projects.map(
              (project, index) => (

                <ProjectRow
                  key={project.title}
                  project={project}
                  index={index}
                />

              )
            )}

          </div>

        </section>

        <section className="about-strip reveal">

          <p>
            I build visual systems,
            mobile-first web apps,
            editorial interfaces and
            experimental digital identities
            with a focus on typography,
            atmosphere and interaction.
          </p>

          <a href="mailto:izakhyllested@icloud.com">
            Start a project →
          </a>

        </section>

      </main>
    </>
  );
}