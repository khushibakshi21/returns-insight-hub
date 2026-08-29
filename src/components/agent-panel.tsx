import { Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, Loader2, Sparkles, TriangleAlert } from "lucide-react";
import { AnalyzeButton } from "@/components/dashboard-shell";
import { SeverityBadge } from "@/components/returns-ui";
import { useAnalysis } from "@/lib/analysis-context";
import { productImages } from "@/lib/product-images";

export function AgentPanel() {
  const { result, status, error } = useAnalysis();

  if (status === "idle") {
    return (
      <section className="panel relative overflow-hidden p-6">
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="rule-label">Live agent</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">
              Run a fresh read of every return comment
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              The agent re-clusters all 20 comments into root causes, scores confidence and drafts
              the fixes worth doing this week.
            </p>
          </div>
          <AnalyzeButton />
        </div>
      </section>
    );
  }

  if (status === "running") {
    return (
      <section className="panel p-6">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-primary" />
          Clustering comments, scoring severity and drafting fixes…
        </p>
        <div className="mt-5 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-md bg-elevated" />
          ))}
        </div>
      </section>
    );
  }

  if (status === "error" || !result) {
    return (
      <section className="panel border-destructive/40 p-6">
        <p className="flex items-start gap-2 text-sm text-destructive">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          {error ?? "The agent could not complete the analysis."}
        </p>
        <div className="mt-4">
          <AnalyzeButton />
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-lg border border-primary/25 bg-primary/[0.07] p-5">
        <span className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
        <div className="flex items-start gap-3 pl-2">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="rule-label">Live agent verdict</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">{result.headline}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem]">
              <span className="rounded-sm border border-border bg-surface px-2 py-1 text-muted-foreground">
                Sentiment: <span className="text-foreground">{result.mood}</span>
              </span>
              <span className="rounded-sm border border-border bg-surface px-2 py-1 text-muted-foreground">
                Preventable:{" "}
                <span className="text-foreground tabular-nums">{result.recoverableReturns}</span> of
                20
              </span>
              <Link
                to="/agent"
                className="rounded-sm border border-primary/40 bg-primary/10 px-2 py-1 font-medium text-primary"
              >
                Ask a follow-up →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="panel p-5">
          <h2 className="text-base font-semibold text-foreground">Agent action queue</h2>
          <ul className="mt-4 space-y-3">
            {result.actions.map((a) => (
              <li
                key={`${a.product}-${a.action}`}
                className="flex gap-3 rounded-md border border-border bg-surface p-3 transition-colors hover:border-primary/30"
              >
                {productImages[a.product] ? (
                  <img
                    src={productImages[a.product]}
                    alt={`${a.product} product photo`}
                    loading="lazy"
                    className="size-14 shrink-0 rounded-md border border-border object-cover"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate text-sm font-semibold text-foreground">{a.product}</h3>
                    <SeverityBadge severity={a.severity} />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{a.issue}</p>
                  <p className="mt-1.5 flex items-start gap-2 text-sm font-medium text-success">
                    <ArrowRight className="mt-0.5 size-4 shrink-0" />
                    {a.action}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[0.7rem] text-muted-foreground">
                    <span>{a.impact}</span>
                    <span className="flex items-center gap-1.5">
                      <Gauge className="size-3.5 text-primary" />
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full bg-primary"
                          style={{ width: `${Math.min(100, Math.max(0, a.confidence))}%` }}
                        />
                      </span>
                      {Math.round(a.confidence)}%
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-4">
          <section className="panel p-5">
            <h2 className="text-base font-semibold text-foreground">Themes the agent found</h2>
            <ul className="mt-4 space-y-3">
              {result.themes.map((t) => (
                <li key={t.theme} className="border-l-2 border-primary/40 pl-3">
                  <p className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
                    {t.theme}
                    <span className="tabular-nums text-muted-foreground">{t.count}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.insight}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-5">
            <h2 className="text-base font-semibold text-foreground">Early watch-outs</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {result.watchouts.map((w) => (
                <li key={w} className="flex gap-2">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <AnalyzeButton full />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
