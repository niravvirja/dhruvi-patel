import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "@phosphor-icons/react";

export type NavItem = { label: string; href: string };

export function MobileCurtain({
  open,
  onClose,
  items,
  email,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  email: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-curtain-row]");
    const meta = el.querySelectorAll<HTMLElement>("[data-curtain-meta]");

    if (!mounted.current) {
      mounted.current = true;
      gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" });
      gsap.set(rows, { yPercent: 120 });
      gsap.set(meta, { opacity: 0, y: 16 });
      if (!open) return;
    }

    const tl = gsap.timeline();
    if (open) {
      tl.set(el, { pointerEvents: "auto" })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
        .to(rows, { yPercent: 0, duration: 0.7, stagger: 0.06, ease: "expo.out" }, 0.18)
        .to(meta, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0.42);
    } else {
      tl.to(meta, { opacity: 0, y: 12, duration: 0.25, ease: "power2.in" })
        .to(rows, { yPercent: 110, duration: 0.35, stagger: 0.04, ease: "power3.in" }, 0)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "expo.inOut" }, 0.16)
        .set(el, { pointerEvents: "none" });
    }
    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      aria-hidden={!open}
      className="fixed inset-0 z-40 flex flex-col overflow-hidden rounded-none text-paper lg:hidden"
      style={{
        backgroundColor: "var(--accent-brand)",
        clipPath: "inset(0% 0% 100% 0%)",
        pointerEvents: "none",
      }}

    >
      <nav className="flex-1 px-5 pt-24">
        {items.map((item) => (
          <div key={item.href} className="overflow-hidden border-b border-paper/12">
            <div data-curtain-row>
              <a
                href={item.href}
                onClick={onClose}
                className="flex items-baseline justify-between py-4"
              >
                <span className="text-[2.15rem] leading-[1.05] font-light tracking-[-0.03em]">
                  {item.label}
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-paper/40" />
              </a>
            </div>
          </div>
        ))}
      </nav>

      <div className="px-5 pb-10 pt-4">
        <div data-curtain-meta>
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-between rounded-full border border-paper/25 bg-paper/10 px-5 py-3.5 text-sm text-paper backdrop-blur-sm transition-colors hover:bg-paper/15"
          >
            <span className="truncate">{email}</span>
            <ArrowUpRight size={16} weight="bold" className="ml-3 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
