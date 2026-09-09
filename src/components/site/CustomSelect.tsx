import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, Check } from "@phosphor-icons/react";

export type Option = { value: string; label: string };

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  invalid = false,
  buttonClassName = "",
  size = "default",
  align = "left",
  width = "w-full",
}: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  invalid?: boolean;
  buttonClassName?: string;
  size?: "default" | "compact";
  align?: "left" | "right";
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) setActive(Math.max(0, options.findIndex((o) => o.value === value)));
  }, [open, value, options]);

  return (
    <div ref={root} className={`relative ${width}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) setOpen(true);
            else {
              if (e.key === "ArrowDown") setActive((i) => Math.min(options.length - 1, i + 1));
              else {
                const option = options[active];
                if (option) onChange(option.value);
                setOpen(false);
              }
            }
          } else if (e.key === "ArrowUp" && open) {
            e.preventDefault();
            setActive((i) => Math.max(0, i - 1));
          } else if (e.key === "Escape") setOpen(false);
        }}
        className={`flex w-full items-center justify-between gap-2 rounded-full border bg-paper text-left transition-colors ${
          invalid ? "border-red-500/60" : "border-ink/15 hover:border-ink/30"
        } ${size === "compact" ? "h-10 px-4 text-[0.8125rem] sm:h-11 sm:px-5 sm:text-sm" : "h-12 px-5 text-sm"} ${buttonClassName}`}
        style={open ? { borderColor: "var(--accent-brand)" } : undefined}
      >
        <span className={selected ? "text-ink" : "text-ink/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <CaretDown size={14} weight="bold" className="text-ink/50" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-40 mt-2 max-h-56 min-w-full overflow-auto rounded-lg border border-ink/10 bg-paper p-1 ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {options.map((o, i) => {
              const isSel = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-ink transition-colors"
                    style={i === active ? { backgroundColor: "color-mix(in oklab, var(--accent-brand) 12%, transparent)" } : undefined}
                  >
                    <span className="whitespace-nowrap">{o.label}</span>
                    {isSel && (
                      <Check size={13} weight="bold" style={{ color: "var(--accent-brand)" }} />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
