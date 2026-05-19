"use client";

import { useEffect, useState } from "react";

export default function MotionShell({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const splash = setTimeout(() => setReady(true), 2550);

    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", x.toFixed(3));
      document.documentElement.style.setProperty("--my", y.toFixed(3));
    };

    const onScroll = () => {
      const y = window.scrollY || 0;
      document.documentElement.style.setProperty("--scroll", String(y));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(splash);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {!ready && (
        <div className="splash">
          <div className="splash-name">Izak Hyllested</div>
        </div>
      )}
      <div className={ready ? "site is-ready" : "site"}>{children}</div>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
