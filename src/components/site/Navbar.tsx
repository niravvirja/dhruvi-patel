import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import logoSage from "@/assets/logo-mark.png";
import { RollingLabel } from "./RollingLabel";
import { MobileCurtain, type NavItem } from "./MobileCurtain";

export const EMAIL = "me.dhruvi.b@gmail.com";
export const PHONE = "+91 91572 52886";
export const PHONE_TEL = "+919157252886";

const items: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
];


export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-0 lg:top-3 lg:px-3">
        <div
          className="pointer-events-auto relative mx-auto flex w-full items-center justify-between gap-3 rounded-none px-4 py-3 transition-colors duration-500 lg:w-[68vw] lg:min-w-[820px] lg:max-w-[1080px] lg:rounded-full lg:p-1.5 lg:px-1.5"
          style={{ backgroundColor: "var(--accent-brand)" }}
        >
          {/* Logo pill */}
            <img
              src={logoSage}
              alt=""
              width={28}
              height={28}
              loading="eager"
              className="h-7 w-7 object-contain relative md:left-7"
            />
            

          {/* Desktop links — centered */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {items.map((item) => {
              return (
                <motion.div key={item.href} initial="rest" whileHover="hover" animate="rest">
                  <a
                    href={item.href}
                    className="relative block px-3.5 py-1.5 text-[0.9rem] text-paper"
                  >
                    <span className="relative block">
                      <RollingLabel label={item.label} />
                    </span>
                  </a>
                </motion.div>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex min-w-0 items-center justify-end gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="hidden h-10 w-[230px] items-center justify-center gap-2 truncate rounded-full border border-paper/35 bg-paper px-5 text-sm text-ink transition-colors duration-300 hover:text-[var(--accent-brand)] lg:inline-flex"
            >
              {EMAIL}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-ink lg:hidden"
            >
              {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      <MobileCurtain open={open} onClose={() => setOpen(false)} items={items} email={EMAIL} />
    </>
  );
}
