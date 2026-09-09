import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { CustomSelect, type Option } from "./CustomSelect";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpkgqqr";

const REASONS: Option[] = [
  { value: "student", label: "Student visa" },
  { value: "work", label: "Work / skilled visa" },
  { value: "tourist", label: "Tourist / visitor visa" },
  { value: "business", label: "Business visa" },
  { value: "family", label: "Family / spouse visa" },
  { value: "refusal", label: "Previous refusal review" },
  { value: "other", label: "Something else" },
];

const DESTINATIONS: Option[] = [
  "USA",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "UAE",
  "New Zealand",
  "Singapore",
  "France",
  "Japan",
  "Not decided yet",
].map((d) => ({ value: d, label: d }));

const TIMELINES: Option[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3", label: "In 1–3 months" },
  { value: "3-6", label: "In 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

const schema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name").max(60, "Too long"),
  lastName: z.string().trim().min(2, "Enter your last name").max(60, "Too long"),
  phone: z.string().trim().regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian mobile number"),
  reason: z.string().trim().min(1, "Choose a reason"),
  destination: z.string().trim().min(1, "Choose a destination"),
  timeline: z.string().trim().min(1, "Choose a timeline"),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  firstName: "",
  lastName: "",
  phone: "",
  reason: "",
  destination: "",
  timeline: "",
};

const labelCls =
  "mb-2 ml-1 block text-[0.65rem] font-medium tracking-[0.14em] uppercase text-ink/70 sm:text-[0.7rem]";
const inputBaseCls =
  "h-10 w-full rounded-full border bg-paper px-4 text-[0.8125rem] text-ink placeholder:text-ink/40 outline-none transition-[border-color,box-shadow] hover:border-ink/30 focus:border-ink/50 focus:ring-2 focus:ring-ink/10 sm:h-11 sm:px-5 sm:text-sm";

function Err({ msg }: { msg?: string | undefined }) {
  if (!msg) return null;
  return (
    <span className="ml-1 mt-1.5 block text-[0.7rem] font-medium text-destructive">
      {msg}
    </span>
  );
}

export function Appointment() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Values;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const reasonLabel = REASONS.find((r) => r.value === parsed.data.reason)?.label ?? parsed.data.reason;
    const timelineLabel = TIMELINES.find((t) => t.value === parsed.data.timeline)?.label ?? parsed.data.timeline;

    const formData = new FormData();
    formData.append("firstName", parsed.data.firstName);
    formData.append("lastName", parsed.data.lastName);
    formData.append("phone", `+91 ${parsed.data.phone}`);
    formData.append("reason", reasonLabel);
    formData.append("destination", parsed.data.destination);
    formData.append("timeline", timelineLabel);
    formData.append("_subject", `Visa enquiry — ${reasonLabel} (${parsed.data.destination})`);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSent(true);
        setValues(initial);
      } else {
        const data = await res.json().catch(() => null);
        setSubmitError(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Could not send. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-card px-4 py-16 sm:px-6 md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-md">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[24rem] flex-col items-center justify-center gap-5 text-center text-ink"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-brand text-paper">
                <CheckCircle size={26} weight="fill" />
              </span>
              <h3 className="text-2xl font-light tracking-[-0.02em] sm:text-3xl">
                Your enquiry is sent.
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-ink/70">
                I&apos;ll review the details and reply, usually within one working day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setErrors({});
                  setSubmitError(null);
                }}
                className="mt-2 text-sm text-ink/70 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink"
              >
                Send another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={submit}
              className="text-ink"
            >
              <header className="mb-12 text-center">
                <p className="text-[0.68rem] tracking-[0.3em] uppercase text-brand">05</p>
                <h2 className="mt-5 text-4xl leading-tight font-light text-ink md:text-6xl">
                  Contact
                </h2>
              </header>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <label className="block">
                  <span className={labelCls}>First name *</span>
                  <input
                    type="text"
                    value={values.firstName}
                    maxLength={60}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Aarav"
                    className={`${inputBaseCls} ${errors.firstName ? "border-destructive/70 hover:border-destructive/70 focus:border-destructive/70" : "border-ink/15"}`}
                  />
                  <Err msg={errors.firstName} />
                </label>

                <label className="block">
                  <span className={labelCls}>Last name *</span>
                  <input
                    type="text"
                    value={values.lastName}
                    maxLength={60}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Sharma"
                    className={`${inputBaseCls} ${errors.lastName ? "border-destructive/70 hover:border-destructive/70 focus:border-destructive/70" : "border-ink/15"}`}
                  />
                  <Err msg={errors.lastName} />
                </label>
              </div>

              <label className="mt-5 block">
                <span className={labelCls}>Mobile number *</span>
                <div
                className={`flex h-10 items-center rounded-full border bg-paper px-0 text-ink transition-[border-color,box-shadow] hover:border-ink/30 focus-within:border-ink/50 focus-within:ring-2 focus-within:ring-ink/10 sm:h-11 ${errors.phone ? "border-destructive/70" : "border-ink/15"}`}
                >
                  <span className="flex h-full shrink-0 items-center border-r border-ink/10 px-4 text-[0.8125rem] text-ink/60 sm:px-5 sm:text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={values.phone}
                    maxLength={10}
                    onChange={(e) => set("phone", e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="h-full min-w-0 flex-1 rounded-r-full bg-transparent px-4 text-[0.8125rem] text-ink outline-none placeholder:text-ink/40 sm:px-5 sm:text-sm"
                  />
                </div>
                <Err msg={errors.phone} />
              </label>

              <div className="mt-5 grid grid-cols-1 gap-5">
                <label className="block">
                  <span className={labelCls}>Reason for enquiry *</span>
                  <CustomSelect
                    value={values.reason}
                    onChange={(v) => set("reason", v)}
                    options={REASONS}
                    placeholder="Visa type"
                    invalid={!!errors.reason}
                    size="compact"
                    buttonClassName="px-5 sm:px-6"
                  />
                  <Err msg={errors.reason} />
                </label>

                <label className="block">
                  <span className={labelCls}>Destination *</span>
                  <CustomSelect
                    value={values.destination}
                    onChange={(v) => set("destination", v)}
                    options={DESTINATIONS}
                    placeholder="Where to?"
                    invalid={!!errors.destination}
                    size="compact"
                    buttonClassName="px-5 sm:px-6"
                  />
                  <Err msg={errors.destination} />
                </label>

                <label className="block">
                  <span className={labelCls}>Timeline *</span>
                  <CustomSelect
                    value={values.timeline}
                    onChange={(v) => set("timeline", v)}
                    options={TIMELINES}
                    placeholder="When?"
                    invalid={!!errors.timeline}
                    size="compact"
                    buttonClassName="px-5 sm:px-6"
                  />
                  <Err msg={errors.timeline} />
                </label>
              </div>

              {submitError && (
                <p className="mt-5 text-center text-sm font-medium text-destructive">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-paper transition-[opacity,transform] hover:opacity-90 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 sm:text-base"
              >
                {submitting ? "Sending…" : "Send enquiry"}
                <ArrowUpRight size={16} weight="bold" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
