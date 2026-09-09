import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";

const TESTIMONIALS = [
  {
    quote:
      "I had already collected most of my documents, but I was never sure if the file was actually complete. Dhruvi went through every page, explained what was missing in simple words, and kept me updated without me having to follow up again and again.",
    name: "Riya Shah",
    place: "Navrangpura, Ahmedabad",
    country: "India",
    caseType: "Canada study visa",
    result: "Approved",
  },
  {
    quote:
      "There was no false promise and no unnecessary urgency. I got a clear checklist on day one, honest answers whenever I called, and a properly organised application at the end. That calmness made a stressful process much easier for our family.",
    name: "Jignesh Patel",
    place: "Chandkheda, Ahmedabad",
    country: "India",
    caseType: "UK visitor visa",
    result: "Approved",
  },
  {
    quote:
      "My work profile was slightly complicated and I expected the paperwork to be exhausting. Dhruvi understood the case quickly, caught two details we had overlooked, and stayed available right until the final update.",
    name: "Mansi Mehta",
    place: "Satellite, Ahmedabad",
    country: "India",
    caseType: "Australia skilled visa",
    result: "Approved",
  },
  {
    quote:
      "What I appreciated most was the patience. Every question was answered properly, even the small ones, and the documents were reviewed more than once before submission. I always knew what was happening next.",
    name: "Kunal Desai",
    place: "Bopal, Ahmedabad",
    country: "India",
    caseType: "Family visa",
    result: "Approved",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeTestimonial = TESTIMONIALS[activeIndex];

  if (!activeTestimonial) return null;

  const selectTestimonial = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const move = (step: number) => {
    setDirection(step);
    setActiveIndex((current) => (current + step + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      className="scroll-mt-16 border-t border-ink/10 bg-card px-5 py-16 sm:px-8 md:py-20 lg:px-14"
    >
      <div className="mx-auto flex min-h-[36rem] w-full max-w-5xl flex-col items-center justify-center text-center md:min-h-[40rem]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="text-center">
            <p className="text-[0.68rem] tracking-[0.3em] uppercase text-brand">03</p>
            <h2 className="mt-5 text-4xl leading-tight font-light text-ink md:text-6xl">
              Testimonials
            </h2>
          </div>

          <div className="relative mx-auto mt-8 min-h-[25rem] overflow-hidden sm:mt-10 sm:min-h-[23rem]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.figure
                key={activeTestimonial.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 42 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -42 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center"
              >
                <Quote
                  size={58}
                  strokeWidth={1.35}
                  aria-hidden="true"
                  className="shrink-0 fill-brand/15 text-brand sm:h-16 sm:w-16"
                />

                <blockquote className="mt-5 max-w-4xl text-lg leading-[1.65] font-light text-ink sm:text-xl md:mt-6 md:text-2xl md:leading-[1.6]">
                  “{activeTestimonial.quote}”
                </blockquote>

                <figcaption className="mt-7 flex flex-col items-center md:mt-8">
                  <p className="text-base font-semibold text-ink">{activeTestimonial.name}</p>
                  <p className="mt-1 text-xs text-ink/55 sm:text-sm">{activeTestimonial.place}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-brand sm:text-sm">
                    <BadgeCheck size={15} aria-hidden="true" />
                    {activeTestimonial.caseType}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center justify-center gap-5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => move(-1)}
              aria-label="Previous testimonial"
              className="rounded-full border-ink/20 bg-transparent text-ink shadow-none hover:bg-ink hover:text-paper"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>

            <div className="flex items-center gap-2" aria-label="Choose testimonial">
              {TESTIMONIALS.map((testimonial, index) => (
                <Button
                  key={testimonial.name}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => selectTestimonial(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className="h-6 w-6 rounded-full p-0 hover:bg-transparent"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-5 bg-brand" : "w-1.5 bg-ink/20"
                    }`}
                  />
                </Button>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => move(1)}
              aria-label="Next testimonial"
              className="rounded-full border-ink/20 bg-transparent text-ink shadow-none hover:bg-ink hover:text-paper"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}