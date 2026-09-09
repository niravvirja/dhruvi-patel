import {
  GraduationCap,
  Briefcase,
  AirplaneTilt,
  Buildings,
  UsersThree,
  ArrowUpRight,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

type Case = {
  icon: Icon;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
};

const CASES: Case[] = [
  {
    icon: GraduationCap,
    title: "Study Visas",
    sub: "Admission to arrival",
    desc: "SOPs, financial documentation and interview prep for university applicants across the US, Canada, UK and Australia.",
    tags: ["SOP", "Funds proof", "I-20 / CAS", "Interview prep"],
  },
  {
    icon: Briefcase,
    title: "Work & Skilled",
    sub: "Employer and points based",
    desc: "Sponsorship paperwork, skill assessments and points-based filings kept accurate down to the last supporting letter.",
    tags: ["Sponsorship", "Skill assessment", "Express Entry"],
  },
  {
    icon: AirplaneTilt,
    title: "Tourist Visas",
    sub: "Short stay, clean files",
    desc: "Itineraries, sponsorship letters and financial trails built so a short-stay file reads clearly to any consulate.",
    tags: ["Itinerary", "Cover letter", "Bank trail"],
  },
  {
    icon: Buildings,
    title: "Business Visas",
    sub: "Invitations & compliance",
    desc: "Company invitations, trade documentation and conference filings prepared for founders and travelling teams.",
    tags: ["Invitation", "GST / ITR", "Trade docs"],
  },
  {
    icon: UsersThree,
    title: "Family & Spouse",
    sub: "Relationship evidence",
    desc: "Sensitive, well-structured relationship evidence and dependant filings for families reuniting abroad.",
    tags: ["Relationship proof", "Dependants", "Affidavits"],
  },
];

const ACCENT_TONE = {
  surface: "var(--work-step-100)",
  foreground: "var(--paper)",
  border: "var(--work-border-dark)",
  muted: "var(--work-muted-dark)",
} as const;

const LIGHT_TONE = {
  surface: "var(--work-step-10)",
  foreground: "var(--ink)",
  border: "var(--work-border-light)",
  muted: "var(--work-muted-light)",
} as const;

function Card({ item, index, total }: { item: Case; index: number; total: number }) {
  const Icon = item.icon;
  const tone = index % 2 === 0 ? ACCENT_TONE : LIGHT_TONE;

  return (
    <div className="sticky top-[58px] flex h-[calc(100vh-58px)] items-center justify-center px-3 md:px-6 lg:top-[72px] lg:h-[calc(100vh-72px)]">
      <div
        style={{
          backgroundColor: tone.surface,
          color: tone.foreground,
          borderColor: tone.border,
          marginTop: `${index * 10}px`,
        }}
        className="relative flex h-[68vh] min-h-[32rem] w-[94vw] max-w-[74rem] origin-top overflow-hidden rounded-lg border md:h-[72vh] md:w-[88vw]"
      >
        <div className="relative z-10 flex h-full w-full flex-col p-6 md:p-10 lg:p-12">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[0.6rem] font-medium tracking-[0.28em] uppercase opacity-60 md:text-[0.68rem]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div
              className="hidden h-14 w-14 items-center justify-center rounded-full border md:flex"
              style={{ borderColor: tone.border }}
            >
              <Icon size={24} weight="light" />
            </div>
          </div>

          <div className="flex max-w-4xl flex-1 flex-col justify-center py-8">
            <Icon size={32} weight="light" className="mb-5 opacity-80 md:hidden" />
            <p className="text-[0.6rem] font-medium tracking-[0.28em] uppercase opacity-60 md:text-[0.68rem]">{item.sub}</p>
            <h3
              className="mt-4 text-4xl leading-[0.98] font-light md:text-6xl lg:text-7xl"
            >
              {item.title}
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed md:mt-8 md:text-base" style={{ color: tone.muted }}>
              {item.desc}
            </p>
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1.5 text-[0.58rem] font-medium tracking-[0.14em] uppercase md:text-[0.62rem]"
                  style={{ borderColor: tone.border }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 self-start rounded-full px-5 py-3 text-[0.65rem] font-medium tracking-[0.18em] uppercase transition-transform hover:-translate-y-0.5 md:self-auto"
              style={{ backgroundColor: tone.foreground, color: tone.surface }}
            >
              Enquire
              <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 border-t border-ink/10 bg-card">
      <div className="px-6 py-20 md:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="text-[0.68rem] tracking-[0.3em] uppercase text-brand">02</p>
          <h2 className="mt-5 text-4xl leading-tight font-light text-ink md:text-6xl">Work</h2>
        </div>
      </div>

      <div className="relative">
        {CASES.map((item, index) => (
          <Card key={item.title} item={item} index={index} total={CASES.length} />
        ))}
      </div>

      <div className="h-[15vh]" />
    </section>
  );
}
