"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, Info } from "lucide-react";

// Brand tokens
const BRAND = "#0B29FF";
const BRAND_TEXT = "#ffffff";
const SUBMIT_ENDPOINT = "/api/send"; // set to your API / webhook

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// ---------------- Shared utils ----------------
export function computeProgress(step: number, total: number): number {
  if (total <= 0) return 0;
  const pct = Math.round(((step + 1) / total) * 100);
  return Math.max(0, Math.min(100, pct));
}

export function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

// ---------------- Types ----------------
type QuizState = {
  projectType: string;
  scope: string[];
  budget: string;
  timeline: string;
  companySize: string;
};

type LeadState = {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  consent: boolean;
};

// ---------------- Progress ----------------
function Progress({ step, total }: { step: number; total: number }) {
  const pct = computeProgress(step, total);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
        <span>
          Step {step + 1} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: BRAND }}
        />
      </div>
    </div>
  );
}

// ---------------- Quiz Steps ----------------
const quizSteps: Array<{
  key: keyof QuizState;
  title: string;
  subtitle: string;
  type: "single" | "multi";
  options: Array<{ value: string; label: string; desc?: string; details?: string[] }>;
}> = [
  {
    key: "projectType",
    title: "What are you building?",
    subtitle: "Pick the closest match.",
    type: "single",
    options: [
      {
        value: "website",
        label: "Website",
        desc: "Company site, landing pages.",
        details: [
          "Responsive design for all devices",
          "SEO optimization and fast loading times",
          "CMS integration (WordPress, Headless)",
          "Custom animations and interactions",
          "Hosting setup + analytics",
        ],
      },
      {
        value: "webapp",
        label: "Web Application",
        desc: "SaaS, dashboards, portals, or internal tools.",
        details: [
          "Auth & roles (SSO, multi-tenant)",
          "API-first (REST/GraphQL)",
          "Billing/subscriptions (Stripe, Paddle)",
          "Integrations (HubSpot, Salesforce, Slack, …)",
          "Analytics + event tracking",
          "Admin panel + audit logs",
        ],
      },
      {
        value: "mobile",
        label: "Mobile App",
        desc: "iOS/Android with modern stacks.",
        details: [
          "React Native/Flutter or native",
          "Push notifications + offline",
          "Secure auth + API integration",
          "App Store / Play deploy",
          "Ongoing maintenance",
        ],
      },
      {
        value: "ecommerce",
        label: "E-commerce",
        desc: "Stores, subscriptions, payments.",
        details: [
          "Shopify/WooCommerce/custom",
          "Stripe/PayPal gateways",
          "Inventory + order management",
          "Personalization",
          "Perf + analytics",
        ],
      },
    ],
  },
  {
    key: "scope",
    title: "Which capabilities do you need?",
    subtitle: "Select all that apply.",
    type: "multi",
    options: [
      { value: "design", label: "Product/UX Design" },
      { value: "frontend", label: "Frontend Engineering" },
      { value: "backend", label: "Backend & APIs" },
      { value: "payments", label: "Payments & Billing" },
      { value: "ai", label: "AI/ML Features" },
      { value: "ops", label: "DevOps & Cloud" },
      { value: "growth", label: "Analytics & Growth" },
      { value: "crm", label: "CRM Integration" },
      { value: "branding", label: "Branding" },
      { value: "other", label: "Not sure / Other" },
    ],
  },
  {
    key: "budget",
    title: "Working budget range",
    subtitle: "A ballpark helps us right-size the team.",
    type: "single",
    options: [
      { value: "lt25", label: "<$25k" },
      { value: "25-75", label: "$25k–$75k" },
      { value: "75-150", label: "$75k–$150k" },
      { value: "gt150", label: ">$150k" },
    ],
  },
  {
    key: "timeline",
    title: "Timeline",
    subtitle: "When do you want to start?",
    type: "single",
    options: [
      { value: "asap", label: "ASAP (next 2–4 weeks)" },
      { value: "soon", label: "Soon (1–2 months)" },
      { value: "later", label: "Later (3+ months)" },
      { value: "continuous", label: "Continuous development" },
    ],
  },
  {
    key: "companySize",
    title: "Company size",
    subtitle: "Helps with process fit.",
    type: "single",
    options: [
      { value: "solo", label: "Solo / Pre-seed" },
      { value: "1-10", label: "1–10" },
      { value: "11-50", label: "11–50" },
      { value: "51-200", label: "51–200" },
      { value: "200+", label: "200+" },
    ],
  },
];

// ---------------- OptionCard ----------------
function OptionCard({
  active,
  onClick,
  label,
  desc,
  details,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  desc?: string;
  details?: string[];
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cx(
        "w-full text-left p-4 rounded-2xl border transition shadow-sm",
        active ? "text-white" : "border-neutral-200 hover:border-neutral-400"
      )}
      style={active ? { backgroundColor: BRAND, borderColor: BRAND } : {}}
    >
      <div className="font-medium flex items-center gap-2">
        {active ? <Check size={18} /> : <Info size={18} />}
        {label}
      </div>
      {desc && (
        <div
          className={cx(
            "mt-1 text-sm",
            active ? "text-white/80" : "text-neutral-600"
          )}
        >
          {desc}
        </div>
      )}
      <AnimatePresence>
        {active && details && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 pl-5 space-y-1 text-sm list-disc text-white/90"
          >
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </button>
  );
}

// ---------------- LeadForm ----------------
function LeadForm({
  onSubmit,
  lead,
  setLead,
  sending,
  canSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  lead: LeadState;
  setLead: (l: LeadState) => void;
  sending: boolean;
  canSubmit: boolean;
}) {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl border bg-white shadow-sm"
    >
      <h3 className="text-2xl font-semibold mb-2">
        Where can we send your scoped plan?
      </h3>
      <p className="text-neutral-600 mb-5">
        Share a few details and we’ll follow up with a tailored plan and
        timeline.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-neutral-600">Full name</label>
          <input
            required
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-600">Work email</label>
          <input
            required
            type="email"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-600">Company</label>
          <input
            value={lead.company}
            onChange={(e) => setLead({ ...lead, company: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-600">Website (optional)</label>
          <input
            type="url"
            value={lead.website}
            onChange={(e) => setLead({ ...lead, website: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2"
            placeholder="https://example.com"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-neutral-600">
            What’s the goal / context?
          </label>
          <textarea
            rows={4}
            value={lead.message}
            onChange={(e) => setLead({ ...lead, message: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2"
            placeholder="Key outcomes, integrations, constraints…"
          />
        </div>
        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            id="consent"
            type="checkbox"
            checked={lead.consent}
            onChange={(e) =>
              setLead({ ...lead, consent: e.target.checked })
            }
            className="h-4 w-4"
          />
          <label htmlFor="consent" className="text-sm text-neutral-600">
            I agree to be contacted by Sinister Consulting and accept the{" "}
            <a className="underline ml-1" href="#">
              privacy policy
            </a>
            .
          </label>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end">
        <button
          data-testid="submit-plan"
          disabled={!canSubmit || sending}
          type="submit"
          className={cx(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white",
            (!canSubmit || sending) && "bg-neutral-400 cursor-not-allowed"
          )}
          style={canSubmit && !sending ? { backgroundColor: BRAND } : {}}
        >
          {sending ? "Sending..." : "Get my plan"}{" "}
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.form>
  );
}

// ---------------- Main Component ----------------
export default function SinisterLanding() {
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState<QuizState>({
    projectType: "",
    scope: [],
    budget: "",
    timeline: "",
    companySize: "",
  });
  const [lead, setLead] = useState<LeadState>({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const totalSteps = quizSteps.length + 1;
  const current = step < quizSteps.length ? quizSteps[step] : null;

  const canNext = current
    ? current.type === "single"
      ? Boolean(quiz[current.key])
      : (quiz[current.key] || []).length > 0
    : !!(lead.name && isValidEmail(lead.email) && lead.consent);

  function handleSelect(
    key: keyof QuizState,
    value: string,
    type: "single" | "multi"
  ) {
    setQuiz((q) => {
      if (type === "multi") {
        const exists = (q[key] as string[]).includes(value);
        const next = exists
          ? (q[key] as string[]).filter((v) => v !== value)
          : ([...(q[key] as string[]), value] as string[]);
        return { ...q, [key]: next } as QuizState;
      }
      return { ...q, [key]: value } as QuizState;
    });
  }

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const scrollToFunnel = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("funnel");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  async function submitAll(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    try {
      await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "info@sinisterconsulting.com",
          subject: `New Sinister lead: ${lead.name || "Unknown"}`,
          quiz,
          lead,
          submittedAt: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.warn("Submission error", error);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: BRAND, color: BRAND_TEXT }}
    >
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo */}
          <img
            src="/sinister-logo.png"
            alt="Sinister Logo"
            className="mx-auto mb-6 h-10 md:h-12 w-auto"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Available for new onboardings</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-4">
            We build digital systems{" "}
            <br className="hidden md:block" />
            that actually ship.
          </h1>

          {/* Subcopy */}
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Sinister Consulting unites senior engineers, designers, and
            operators across time zones to ship production-grade apps,
            platforms, and tools — fast, secure, and built to scale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToFunnel}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-medium bg-white text-blue-700 shadow-sm hover:shadow-md transition-shadow"
            >
              Start your project <ArrowRight size={18} />
            </button>
            <a
              href="mailto:info@sinisterconsulting.com"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl font-medium text-white/80 hover:text-white border border-white/25 hover:border-white/60 transition-colors"
            >
              Or email us directly
            </a>
          </div>

          {/* Supporting line */}
          <p className="mt-4 text-xs md:text-sm text-white/60">
            Typical engagement: discovery in 1 week, first prototype in 2–4
            weeks.
          </p>
        </motion.div>
      </section>

      {/* FUNNEL */}
      <section
        id="funnel"
        className="max-w-3xl mx-auto px-4 pb-12 text-black bg-white rounded-t-3xl"
      >
        <div className="pt-10">
          <Progress step={step} total={totalSteps} />
        </div>

        {!submitted ? (
          <div className="grid gap-6 mt-6">
            {current ? (
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl border bg-white shadow-sm"
              >
                <h3 className="text-2xl font-semibold">{current.title}</h3>
                <p className="text-neutral-600 mb-5">{current.subtitle}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {current.options.map((opt) => {
                    const isActive =
                      current.type === "multi"
                        ? (quiz[current.key] as string[]).includes(opt.value)
                        : (quiz[current.key] as string) === opt.value;
                    return (
                      <OptionCard
                        key={opt.value}
                        active={isActive}
                        onClick={() =>
                          handleSelect(current.key, opt.value, current.type)
                        }
                        label={opt.label}
                        desc={opt.desc}
                        details={opt.details}
                      />
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prev}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-neutral-50"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    data-testid="next"
                    disabled={!canNext}
                    onClick={next}
                    className={cx(
                      "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white",
                      !canNext && "bg-neutral-400 cursor-not-allowed"
                    )}
                    style={canNext ? { backgroundColor: BRAND } : {}}
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <LeadForm
                onSubmit={submitAll}
                lead={lead}
                setLead={setLead}
                sending={sending}
                canSubmit={canNext}
              />
            )}
          </div>
        ) : (
          <div className="p-6 my-6 rounded-3xl bg-white shadow-sm text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2
                data-testid="thank-you"
                className="text-4xl font-semibold text-blue-700"
              >
                Thank you for the trust.
              </h2>
              <p className="text-neutral-700 text-lg max-w-xl mx-auto">
                We’ll contact you ASAP. Our global team of sharp minds will
                align, scope, and deploy — fast.
              </p>
            </motion.div>
          </div>
        )}
      </section>

      <footer className="text-center py-10 text-white/80">
        <div>© {new Date().getFullYear()} Sinister Consulting</div>
        <div>
          <a href="mailto:info@sinisterconsulting.com" className="underline">
            info@sinisterconsulting.com
          </a>{" "}
          • sinisterconsulting.com
        </div>
      </footer>
    </div>
  );
}
