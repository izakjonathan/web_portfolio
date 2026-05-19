"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-name">Izak Hyllested</div>
    </div>
  );
}
