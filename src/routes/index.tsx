import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PackageSearch, Repeat2, TriangleAlert } from "lucide-react";
import { DashboardShell, PageHeading } from "@/components/dashboard-shell";
import { SeverityBadge, SummaryBanner } from "@/components/returns-ui";
import { productImages } from "@/lib/product-images";
import { aiSummary, flaggedProducts, reasonBreakdown, returnRecords } from "@/lib/returns-data";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boomerang — Returns Intelligence for Ops Teams" },
      {
        name: "description",
        content:
          "See why customers send things back: return reasons, recurring product issues and recommended fixes in one ops dashboard.",
      },
      { property: "og:title", content: "Boomerang — Returns Intelligence" },
      {
        property: "og:description",
        content: "Turn return comments into fixable causes and clear next actions.",
      },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  const analyzed = returnRecords.length;
  const highSeverity = returnRecords.filter((r) => r.severity === "high").length;
  const maxCount = Math.max(...reasonBreakdown.map((r) => r.count));
  const topReasons = [...reasonBreakdown].sort((a, b) => b.count - a.count).slice(0, 4);

  const kpis = [
    { label: "Returns analyzed", value: analyzed, note: "last 30 days", Icon: PackageSearch },
    {
      label: "Products with recurring issues",
      value: flaggedProducts.length,
      note: "2+ related returns",
      Icon: Repeat2,
    },
    {
      label: "High-severity cases",
      value: highSeverity,
      note: "needs action now",
      Icon: TriangleAlert,
    },
  ];

  return (
    <DashboardShell>
      <PageHeading
        eyebrow="Overview"
        title="Why customers are sending things back"
        lede="Twenty return comments, clustered into causes your team can actually fix this week."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        {kpis.map(({ label, value, note, Icon }) => (
          <div
            key={label}
            className="panel group relative overflow-hidden p-5 transition-colors hover:border-primary/30"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60" />
            <div className="flex items-start justify-between">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
              <Icon className="size-4 text-primary" />
            </div>
            <p className="gold-text mt-5 font-display text-[2.6rem] leading-none font-semibold tabular-nums">
              {String(value).padStart(2, "0")}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{note}</p>
          </div>
        ))}
      </section>


      <div className="mt-4">
        <SummaryBanner text={aiSummary} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-foreground">Top return reasons</h2>
            <Link
              to="/reasons"
              className="text-xs font-medium text-primary transition-opacity hover:opacity-80"
            >
              All reasons
            </Link>
          </div>
          <ul className="mt-5 space-y-3.5">
            {topReasons.map(({ category, count }) => (
              <li key={category} className="grid grid-cols-[8.5rem_1fr_1.5rem] items-center gap-3">
                <span className="truncate text-sm text-muted-foreground">{category}</span>
                <span className="h-2.5 rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${(count / maxCount) * 100}%` }}
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
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-foreground">Needs attention</h2>
            <Link
              to="/products"
              className="text-xs font-medium text-primary transition-opacity hover:opacity-80"
            >
              All flagged
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {flaggedProducts.slice(0, 3).map((item) => (
              <li className="flex gap-3 rounded-md border border-border bg-surface p-3 transition-colors hover:border-primary/30 hover:bg-elevated" key={item.product}>
                <img
                  src={productImages[item.product]}
                  alt={`${item.product} product photo`}
                  loading="lazy"
                  width={768}
                  height={576}
                  className="size-14 shrink-0 rounded-md border border-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate text-sm font-semibold text-foreground">{item.product}</h3>
                    <SeverityBadge severity={item.severity} />
                  </div>
                  <p className="mt-1.5 flex items-start gap-2 text-sm font-medium text-success">
                    <ArrowRight className="mt-0.5 size-4 shrink-0" />
                    {item.action}
                  </p>
                </div>
              </li>

            ))}
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
