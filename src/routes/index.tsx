import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck2, LayoutTemplate, FileDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LumeCV — Build Your Professional Resume in Minutes" },
      {
        name: "description",
        content:
          "Create a clean, ATS-friendly resume that attracts recruiters and top companies. Live preview, instant PDF export.",
      },
      { property: "og:title", content: "BKVS — Modern ATS Resume Builder" },
      {
        property: "og:description",
        content: "Recruiter-ready resumes in minutes. Live preview, instant PDF export.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen hero-bg">
      {/* Nav */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary glow-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">LumeCV</span>
        </div>
        <Link to="/builder">
          <Button variant="outline" className="rounded-xl">
            Open Builder
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full gradient-primary" />
            ATS-Optimized · 1–2 Pages · Recruiter Approved
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Build Your <span className="gradient-text">Professional Resume</span> in Minutes
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Create a clean ATS-friendly resume that attracts recruiters and top companies.
            Live preview, smart formatting, and instant PDF export.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/builder">
              <Button
                size="lg"
                className="rounded-xl gradient-primary text-white border-0 px-7 h-12 hover:opacity-95 animate-pulse-glow"
              >
                Start Building <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl h-12 border-border bg-transparent"
            >
              View Sample
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div>⭐ 4.9 / 5 Rating</div>
            <div>50k+ Resumes Built</div>
          </div>
        </div>

        {/* Resume mockup */}
        <div className="relative animate-float">
          <div
            className="absolute -inset-6 rounded-3xl blur-3xl opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="relative glass-strong rounded-3xl p-6">
            <div className="bg-white text-neutral-900 rounded-xl p-6 shadow-2xl aspect-[1/1.25] overflow-hidden">
              <div className="border-b-2 border-neutral-900 pb-3">
                <div className="text-2xl font-bold tracking-tight">Alex Morgan</div>
                <div className="text-xs text-neutral-500 mt-1">
                  San Francisco · alex.morgan@email.com · +1 555 123 4567
                </div>
              </div>
              <Mock title="Summary">
                <div className="h-2 bg-neutral-200 rounded w-full mb-1.5" />
                <div className="h-2 bg-neutral-200 rounded w-11/12 mb-1.5" />
                <div className="h-2 bg-neutral-200 rounded w-9/12" />
              </Mock>
              <Mock title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL"].map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 border border-neutral-300 rounded bg-neutral-50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Mock>
              <Mock title="Experience">
                <div className="text-xs font-semibold">Senior Engineer · Acme Corp</div>
                <div className="h-2 bg-neutral-200 rounded w-full mt-1.5 mb-1" />
                <div className="h-2 bg-neutral-200 rounded w-10/12" />
              </Mock>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need, <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            Designed with hiring managers and ATS systems in mind.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-strong rounded-2xl p-6 smooth hover:-translate-y-1 hover:glow-primary"
            >
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-strong rounded-3xl p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Land your next role <span className="gradient-text">faster</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Build a recruiter-friendly resume in under 5 minutes.
          </p>
          <Link to="/builder">
            <Button
              size="lg"
              className="rounded-xl gradient-primary text-white border-0 px-7 h-12"
            >
              Start Building Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LumeCV — Crafted for ambitious careers.
      </footer>
    </div>
  );
}

function Mock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-[10px] font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

const features = [
  {
    icon: FileCheck2,
    title: "ATS-Friendly Layout",
    desc: "Clean structure that parses perfectly through every applicant tracking system.",
  },
  {
    icon: LayoutTemplate,
    title: "Modern Templates",
    desc: "Professional, minimalist designs trusted by recruiters at top companies.",
  },
  {
    icon: Sparkles,
    title: "Auto Format to 1–2 Pages",
    desc: "Smart spacing keeps your resume tight and within recruiter-friendly limits.",
  },
  {
    icon: FileDown,
    title: "Instant PDF Download",
    desc: "High-resolution, print-ready exports with crisp text and clean page breaks.",
  },
];
