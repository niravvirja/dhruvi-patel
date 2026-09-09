import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import portrait from "@/assets/dhruvi-portrait.jpeg";

/* ─────────────────────────── content ─────────────────────────── */

const INTRO =
  "Dhruvi Patel guides students, professionals and families through almost every visa category — study, work, tourist, business, family and residency. Every file begins with a clear checklist, honest timelines and a document review that catches the small gaps refusals are usually built on.";

type Step = {
  year: string;
  metric: string;
  metricLabel: string;
};

const STEPS: Step[] = [
  { year: "2019", metric: "01", metricLabel: "First desk" },
  { year: "2021", metric: "10+", metricLabel: "Destinations" },
  { year: "2023", metric: "600+", metricLabel: "Applications" },
  { year: "2024", metric: "97%", metricLabel: "Approval rate" },
  { year: "2025", metric: "5+", metricLabel: "Years in practice" },
];

/* Shared scroll budget: intro reads first, then the steps follow. */
const INTRO_END = 0.45; // intro words finish by 45% of the track


/* ───────────────────────── reading text ──────────────────────── */

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

function ReadingParagraph({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <div>
      <p
        className="text-[1rem] leading-[1.55] font-light tracking-[-0.01em] text-ink sm:text-[1.12rem] lg:text-[1.22rem]"
        style={{ textAlign: "justify", textAlignLast: "left" }}
      >
        {words.map((w, i) => (
          <Word
            key={i}
            progress={progress}
            range={[
              (i / words.length) * INTRO_END,
              ((i + 1) / words.length) * INTRO_END,
            ]}
          >
            {w}
          </Word>
        ))}
      </p>
    </div>
  );
}

/* ───────────────────────── journey step ─────────────────────── */

function StepRow({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const yearOnLeft = index % 2 === 0;

  /* Steps live in the second half of the shared scroll budget, one after the other. */
  const stepSpan = (1 - INTRO_END) / total;
  const start = INTRO_END + index * stepSpan;
  const end = start + stepSpan * 0.62;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);
  const scale = useTransform(progress, [start, end], [0, 1]);

  const yearCell = (
    <motion.div
      style={{ opacity, y }}
      className={yearOnLeft ? "pr-6 text-right" : "pl-6 text-left"}
    >
      <span className="text-[0.62rem] tracking-[0.22em] uppercase text-brand">
        {step.year}
      </span>
    </motion.div>
  );

  const infoCell = (
    <motion.div
      style={{ opacity, y }}
      className={`flex min-w-0 items-baseline gap-2 ${
        yearOnLeft ? "pl-6" : "justify-end pr-6"
      }`}
    >
      <span className="text-[1.05rem] leading-none font-light tracking-[-0.03em] text-ink sm:text-[1.2rem]">
        {step.metric}
      </span>
      <span className="truncate text-[0.56rem] tracking-[0.18em] whitespace-nowrap uppercase text-ink/40">
        {step.metricLabel}
      </span>
    </motion.div>
  );

  return (
    <li className="relative grid grid-cols-2 items-center py-4">
      {/* node */}
      <motion.span
        aria-hidden
        style={{ scale, backgroundColor: "var(--accent-brand)" }}
        className="absolute top-1/2 left-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      {yearOnLeft ? (
        <>
          {yearCell}
          {infoCell}
        </>
      ) : (
        <>
          {infoCell}
          {yearCell}
        </>
      )}
    </li>
  );
}

/* ─────────────────────────── section ─────────────────────────── */

export function About() {
  /* One scroll track drives BOTH the intro reading and the timeline reveal,
     in strict order: words first (0 → INTRO_END), steps after (INTRO_END → 1). */
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: trackRef,
    offset: ["start 96px", "end 96px"],
  });
  const railScale = useTransform(progress, [INTRO_END, 1], [0, 1]);

  return (
    <section
      id="about"
      className="scroll-mt-16 relative border-t border-ink/12 bg-card"
    >
      <div className="mx-auto w-full max-w-3xl px-6 py-20 md:px-10 md:py-28">
        {/* heading — same pattern as every other section */}
        <div className="text-center">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-brand">01</p>
          <h2 className="mt-5 text-4xl leading-tight font-light text-ink md:text-6xl">
            About
          </h2>
        </div>

        {/* portrait — centered, static outline */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <div className="rounded-full p-[10px] ring-1 ring-ink/10">
            <div
              className="rounded-full p-[3px]"
              style={{ border: "1px solid var(--accent-brand)" }}
            >
              <img
                src={portrait}
                alt="Dhruvi Patel, visa executive, reviewing application documents at her desk"
                width={1024}
                height={1280}
                loading="lazy"
                className="size-[120px] rounded-full object-cover object-top sm:size-[136px]"
              />
            </div>
          </div>
        </motion.figure>

        {/* shared scroll track: intro pins at the top and reads word by word,
            then the timeline pins in the same place and reveals year by year */}
        <div ref={trackRef} className="relative mt-12 h-[60rem] sm:h-[58rem]">
          <div className="sticky top-24 sm:top-28">
            <ReadingParagraph text={INTRO} progress={progress} />

            {/* timeline — sits right under the pinned intro */}
            <ol className="relative mt-14">
              <span
                aria-hidden
                className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-ink/10"
              />
              <motion.span
                aria-hidden
                style={{
                  scaleY: railScale,
                  backgroundColor: "var(--accent-brand)",
                }}
                className="absolute top-2 bottom-2 left-1/2 w-px origin-top -translate-x-1/2"
              />
              {STEPS.map((s, i) => (
                <StepRow
                  key={s.year}
                  step={s}
                  index={i}
                  total={STEPS.length}
                  progress={progress}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
