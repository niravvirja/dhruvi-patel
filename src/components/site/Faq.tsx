import { useState } from "react";

import { motion } from "motion/react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

const FAQS = [
  {
    q: "Which visa categories do you handle?",
    a: "Study, work and skilled, tourist, business, family and spouse, plus permanent residency and long-stay applications across ten of the most-applied destinations.",
  },
  {
    q: "How long does a typical application take?",
    a: "Document preparation usually takes one to three weeks depending on how quickly papers come through. Official processing time afterwards depends entirely on the consulate — you get a realistic window before we begin, never an optimistic guess.",
  },
  {
    q: "What documents should I have ready?",
    a: "Passport, recent photographs, financial proof, and category-specific papers such as admission letters, employment records or invitation letters. You receive a personalised checklist after the first conversation.",
  },
  {
    q: "Can you help if my visa was refused earlier?",
    a: "Yes. Refusals are reviewed line by line to understand what the officer questioned, then the file is rebuilt with stronger evidence and a clear cover explanation before reapplying.",
  },
  {
    q: "Do you work with applicants outside India?",
    a: "Absolutely. Most files are handled remotely over email and calls, with documents shared securely — location has never been a limitation.",
  },
  {
    q: "How are fees structured?",
    a: "A single transparent fee per application, quoted upfront after reviewing your case. Government and consulate charges are always separate and paid directly by you.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-ink/10 bg-card px-6 py-16 md:px-10 md:py-20 lg:px-14"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-brand">04</p>
          <h2 className="mt-5 text-4xl leading-tight font-light text-ink md:text-6xl">FAQs</h2>
        </div>

        <div className="mt-14 border-t border-ink/15">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-ink/15">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="h-auto w-full min-w-0 justify-between gap-4 whitespace-normal rounded-none px-0 py-5 text-left hover:bg-transparent sm:gap-6"
                >
                  <span className="min-w-0 flex-1 text-base font-light text-ink transition-colors md:text-xl">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`grid size-7 shrink-0 place-items-center rounded-full border will-change-transform ${
                      isOpen
                        ? "border-brand bg-brand text-paper"
                        : "border-ink/15 bg-transparent text-ink"
                    }`}
                  >
                    <Plus size={14} strokeWidth={1.5} aria-hidden="true" />
                  </motion.span>
                </Button>

                <div
                  id={`faq-answer-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-ink/60">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
