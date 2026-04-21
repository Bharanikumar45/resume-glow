import { useMemo } from "react";
import { ExternalLink, CheckCircle2, AlertCircle, Target, Sparkles } from "lucide-react";
import { analyzeSkills } from "@/lib/skills-advisor";

interface Props {
  targetPosition: string;
  skills: string[];
}

export function SkillsAdvisor({ targetPosition, skills }: Props) {
  const result = useMemo(() => analyzeSkills(targetPosition, skills), [targetPosition, skills]);

  if (!targetPosition.trim()) {
    return (
      <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground flex items-center gap-2">
        <Target className="w-4 h-4" />
        Enter a target position above to get personalized skill recommendations.
      </div>
    );
  }

  if (!result.matchedRole) {
    return (
      <div className="rounded-xl glass p-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="w-4 h-4" />
          We don't have a curated path for "<span className="text-foreground">{targetPosition}</span>" yet — your skills look fine for it.
        </div>
      </div>
    );
  }

  const pct = Math.round((result.matched.length / result.totalRequired) * 100);
  const isStrong = pct >= 80;

  return (
    <div className="rounded-2xl glass-strong p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">Skill Match for <span className="gradient-text capitalize">{result.matchedRole}</span></div>
            <div className="text-xs text-muted-foreground">{result.matched.length} of {result.totalRequired} core skills covered</div>
          </div>
        </div>
        <div className={`text-2xl font-bold ${isStrong ? "text-emerald-400" : "gradient-text"}`}>{pct}%</div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full gradient-primary smooth"
          style={{ width: `${pct}%` }}
        />
      </div>

      {isStrong ? (
        <div className="flex items-start gap-2 text-sm text-emerald-400">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          <span>Your skills look strong for this role. You're ready to apply.</span>
        </div>
      ) : (
        <div className="flex items-start gap-2 text-sm text-amber-400">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>You'd be more competitive with a few more skills. Recommended courses below 👇</span>
        </div>
      )}

      {result.missing.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Recommended Courses</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {result.missing.map((c) => (
              <a
                key={c.skill}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass rounded-xl p-3 smooth hover:glow-primary hover:-translate-y-0.5 flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground capitalize">{c.skill}</div>
                  <div className="text-sm font-medium truncate">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.provider}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}