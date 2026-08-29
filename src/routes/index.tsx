import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles, TriangleAlert, PackageSearch, Repeat2 } from "lucide-react";
import {
  aiSummary,
  flaggedProducts,
  reasonBreakdown,
  returnRecords,
  type Severity,
} from "@/lib/returns-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Returns Intelligence Agent — Returns Insights Dashboard" },
      {
        name: "description",
        content:
          "Analyze why customers send products back: return reasons, flagged products with recommended actions, and a full log of individual returns.",
      },
      { property: "og:title", content: "Returns Intelligence Agent" },
      {
        property: "og:description",
        content:
          "E-commerce ops dashboard surfacing return reasons, recurring product issues and recommended fixes.",
      },
    ],
  }),
  component: ReturnsDashboard,
});

const severityStyles: Record<Severity, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/40",
  medium: "bg-primary/15 text-primary border-primary/40",
  low: "bg-success/15 text-success border-success/40",
};

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}

function analyzeReturns() {
  // Placeholder — will be wired to the backend analysis function.
  console.log("Analyze returns: backend function not connected yet.");
}

function ReturnsDashboard() {
  const analyzed = returnRecords.length;
  const recurring = flaggedProducts.length;
  const highSeverity = returnRecords.filter((r) => r.severity === "high").length;
  const maxCount = Math.max(...reasonBreakdown.map((r) => r.count));

  const kpis = [
    { label: "Returns analyzed", value: analyzed, note: "last 30 days", Icon: PackageSearch },
    { label: "Products with recurring issues", value: recurring, note: "2+ related returns", Icon: Repeat2 },
    { label: "High-severity cases", value: highSeverity, note: "needs action now", Icon: TriangleAlert },
  ];

  return (
    <main className="min-h-screen bg-background px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Returns Intelligence Agent
            </p>
            <h1 className="mt-2 max-w-xl text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Why customers are sending things back
            </h1>
          </div>
          <button
            onClick={analyzeReturns}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Sparkles className="size-4" />
            Analyze returns
          </button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {kpis.map(({ label, value, note, Icon }) => (
            <div key={label} className="panel p-5">
              <div className="flex items-start justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-4 font-display text-4xl font-semibold text-foreground">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{note}</p>
            </div>
          ))}
        </section>

        <section className="mt-4 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">{aiSummary}</p>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section className="panel p-5">
            <h2 className="text-base font-semibold text-foreground">Return reasons</h2>
            <p className="mt-1 text-xs text-muted-foreground">Distribution across {analyzed} returns</p>
            <ul className="mt-5 space-y-3.5">
              {reasonBreakdown.map(({ category, count }) => (
                <li key={category} className="grid grid-cols-[9.5rem_1fr_1.5rem] items-center gap-3">
                  <span className="truncate text-sm text-muted-foreground">{category}</span>
                  <span className="h-2.5 rounded-full bg-secondary">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${count === 0 ? 2 : (count / maxCount) * 100}%` }}
                    />
                  </span>
                  <span className="text-right text-sm font-medium tabular-nums text-foreground">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-5">
            <h2 className="text-base font-semibold text-foreground">Flagged products</h2>
            <p className="mt-1 text-xs text-muted-foreground">Recurring issues with recommended fixes</p>
            <ul className="mt-5 space-y-3">
              {flaggedProducts.map((item) => (
                <li key={item.product} className="rounded-lg border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{item.product}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{item.returns} returns</span>
                      <SeverityBadge severity={item.severity} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.issue}</p>
                  <p className="mt-3 flex items-start gap-2 text-sm font-medium text-success">
                    <ArrowRight className="mt-0.5 size-4 shrink-0" />
                    {item.action}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="panel mt-4 overflow-hidden">
          <div className="border-b border-border p-5">
            <h2 className="text-base font-semibold text-foreground">All returns</h2>
            <p className="mt-1 text-xs text-muted-foreground">Individual records with customer comments</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Order ID</th>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Comment</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody>
                {returnRecords.map((r) => (
                  <tr key={r.orderId} className="border-t border-border/70 align-top">
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.orderId}</td>
                    <td className="px-5 py-3 font-medium text-foreground">{r.product}</td>
                    <td className="max-w-md px-5 py-3 text-muted-foreground">{r.comment}</td>
                    <td className="px-5 py-3 text-foreground">{r.category}</td>
                    <td className="px-5 py-3">
                      <SeverityBadge severity={r.severity} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
