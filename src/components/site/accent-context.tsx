import { createContext, useContext, useEffect } from "react";

export const ACCENTS = [
  { id: "sage", value: "oklch(0.6069 0.0432 130.24)", label: "Sage" },
] as const;

type AccentContextValue = {
  index: number;
  accent: (typeof ACCENTS)[number];
};

const AccentContext = createContext<AccentContextValue | null>(null);

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const accent = ACCENTS[0];

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-brand", accent.value);
    document.documentElement.dataset["accent"] = accent.id;
  }, [accent]);

  return (
    <AccentContext.Provider value={{ index: 0, accent }}>{children}</AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
}
