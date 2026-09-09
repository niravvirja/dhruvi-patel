import type { ReactNode } from "react";

/**
 * The shared "blocked container" used by every section: one full-viewport
 * card sitting below the fixed navbar, matching the landing page.
 */
export function PageShell({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <main className="w-full px-3 pb-3 md:px-4">
      <section className="relative flex h-svh min-h-[560px] w-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-ink/10">
        <div className="flex h-full flex-col justify-center px-6 py-8 pt-24 md:px-10 md:pt-28 lg:px-14 lg:pt-32">
          <p
            className="text-[0.6rem] tracking-[0.3em] uppercase md:text-[0.68rem]"
            style={{ color: "var(--accent-brand)" }}
          >
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.2rem] leading-[1.0] font-light tracking-[-0.04em] text-ink sm:text-[2.8rem] lg:mt-6 lg:text-[4.2rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/60 lg:text-base">{body}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </section>
    </main>
  );
}
