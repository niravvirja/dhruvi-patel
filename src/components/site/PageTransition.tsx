import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";

/**
 * Barba-style page transition: an accent panel sweeps across the viewport
 * whenever the route changes, then reveals the new page.
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const panel = useRef<HTMLDivElement>(null);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (first) {
      setFirst(false);
      return;
    }
    const el = panel.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.set(el, { pointerEvents: "auto", clipPath: "inset(0% 0% 100% 0%)" })
      .to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.45,
        ease: "power3.inOut",
      })
      .to(el, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
        delay: 0.05,
      })
      .set(el, { pointerEvents: "none" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      ref={panel}
      aria-hidden
      className="fixed inset-0 z-[70]"
      style={{
        backgroundColor: "var(--accent-brand)",
        clipPath: "inset(100% 0% 0% 0%)",
        pointerEvents: "none",
      }}
    />
  );
}
