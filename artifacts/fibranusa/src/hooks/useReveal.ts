import { useEffect } from "react";

export function useReveal(dep?: unknown) {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".reveal,.reveal-l,.reveal-r");
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
        { threshold: 0.1 }
      );
      els.forEach((el) => obs.observe(el));
      return obs;
    };
    const obs = run();
    return () => obs.disconnect();
  }, [dep]);
}
