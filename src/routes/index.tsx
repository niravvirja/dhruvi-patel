import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Briefcase, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { EMAIL, PHONE, PHONE_TEL } from "@/components/site/Navbar";
import { DestinationGlobe } from "@/components/site/DestinationGlobe";
import { Appointment } from "@/components/site/Appointment";

import { Faq } from "@/components/site/Faq";
import { About } from "@/components/site/About";
import { Work } from "@/components/site/Work";
import { Testimonials } from "@/components/site/Testimonials";

const TITLE = "Dhruvi Patel — Visa Consultant & Visa Agent in Ahmedabad";
const DESCRIPTION =
  "Dhruvi Patel is a visa executive and visa consultant in Ahmedabad with 5+ years of experience — study, work, tourist, business and family visa documentation with hundreds of approved applications.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Dhruvi Patel visa, visa consultant Ahmedabad, visa agent Ahmedabad, visa executive Ahmedabad, study visa consultant Ahmedabad, tourist visa agent Ahmedabad, work visa consultant Gujarat, immigration documentation Ahmedabad, visa file preparation, Schengen visa Ahmedabad, Canada study visa Ahmedabad, USA visitor visa Ahmedabad",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "geo.region", content: "IN-GJ" },
      { name: "geo.placename", content: "Ahmedabad" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "/#dhruvi",
              name: "Dhruvi Patel",
              jobTitle: "Visa Executive & Visa Consultant",
              description: DESCRIPTION,
              email: `mailto:${EMAIL}`,
              telephone: PHONE_TEL,
              knowsAbout: [
                "Visa documentation",
                "Study visa",
                "Work visa",
                "Tourist visa",
                "Business visa",
                "Family visa",
                "Immigration paperwork",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
            },
            {
              "@type": "ProfessionalService",
              "@id": "/#service",
              name: "Dhruvi Patel — Visa Consultant Ahmedabad",
              description: DESCRIPTION,
              areaServed: [
                { "@type": "City", name: "Ahmedabad" },
                { "@type": "State", name: "Gujarat" },
                { "@type": "Country", name: "India" },
              ],
              serviceType: [
                "Visa consultant",
                "Visa agent",
                "Study visa documentation",
                "Work visa documentation",
                "Tourist visa documentation",
                "Business visa documentation",
                "Family visa documentation",
              ],
              email: `mailto:${EMAIL}`,
              telephone: PHONE_TEL,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
              provider: { "@id": "/#dhruvi" },
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              name: "Dhruvi Patel — Visa Executive",
              description: DESCRIPTION,
              inLanguage: "en-IN",
              publisher: { "@id": "/#dhruvi" },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerY = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  return (
    <main id="home" className="w-full">
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-card">
        <div className="mx-auto flex min-h-[inherit] w-full max-w-7xl flex-col items-center gap-6 px-6 py-10 pt-24 md:px-10 md:pt-28 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:px-14 lg:py-0 lg:pt-32">
          {/* Globe first on mobile, right on desktop */}
          <div className="order-1 flex w-full shrink flex-col items-center justify-center lg:order-2">
            <DestinationGlobe className="mx-auto max-w-[300px] sm:max-w-[380px] lg:max-w-[520px]" />
          </div>


          {/* Minimal content */}
          <div className="order-2 w-full text-center lg:order-1 lg:text-left">
            <p
              className="hidden text-[0.6rem] tracking-[0.3em] uppercase md:block md:text-[0.68rem]"
              style={{ color: "var(--accent-brand)" }}
            >
              Visa Executive — Ahmedabad, IN
            </p>
            <h1 className="mt-3 text-[1.85rem] leading-[0.98] font-normal tracking-[-0.04em] text-ink sm:text-[2.4rem] md:mt-4 lg:mt-6 lg:text-[4.4rem]">
              Dhruvi Patel
            </h1>
            <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink/60 md:mt-4 md:text-sm lg:mx-0 lg:mt-6 lg:text-base">
              5+ years of visa documentation across 11 of the world's most-applied
              destinations, with hundreds of approved applications.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6 lg:mt-8 lg:justify-start">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs text-paper transition-opacity hover:opacity-90 md:px-5 md:text-sm lg:h-12 lg:w-[15rem] lg:px-0"
                style={{ backgroundColor: "var(--accent-brand)" }}
              >
                <EnvelopeSimple size={14} weight="bold" />
                Start a conversation
              </a>
              <a
                href="#work"
                className="hidden items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-xs text-ink transition-colors hover:border-ink/30 hover:bg-ink/5 md:px-5 md:text-sm lg:inline-flex lg:h-12 lg:w-[15rem] lg:px-0"
              >
                <Briefcase size={14} weight="bold" />
                View case work
              </a>
            </div>
          </div>
        </div>
      </section>

      <About />

      <Work />


      <Testimonials />


      <Faq />


      <Appointment />


      <footer ref={footerRef} className="relative overflow-hidden bg-card">
        <motion.div
          style={{ y: footerY }}
          className="flex min-h-[26vh] flex-col justify-between rounded-t-[1.25rem] bg-brand px-5 pb-4 pt-6 text-paper sm:min-h-[34vh] sm:rounded-t-[1.75rem] sm:px-6 sm:pb-5 sm:pt-8 md:min-h-[46vh] md:rounded-t-[2.25rem] md:px-10 md:pt-12 lg:min-h-[60vh] lg:px-14"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center text-center">
            <h2 className="text-[1.9rem] leading-[0.95] font-bold tracking-[-0.03em] text-paper/20 sm:text-[3.2rem] md:text-[5rem] lg:text-[8rem]">
              Dhruvi Patel
            </h2>

            <div className="mt-4 flex flex-col items-center gap-2 text-xs font-medium sm:mt-6 sm:flex-row sm:gap-5 sm:text-sm md:mt-8 md:text-base lg:gap-8">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-1.5 text-paper/70 transition-colors hover:text-paper sm:gap-2"
              >
                <EnvelopeSimple size={14} className="sm:hidden" />
                <EnvelopeSimple size={18} className="hidden sm:block" />
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-1.5 text-paper/70 transition-colors hover:text-paper sm:gap-2"
              >
                <Phone size={14} className="sm:hidden" />
                <Phone size={18} className="hidden sm:block" />
                {PHONE}
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-7xl border-t border-paper/10 pt-3 text-center text-[0.6rem] text-paper/50 sm:pt-4 sm:text-xs">
            <p>© 2026 Dhruvi Patel</p>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}

