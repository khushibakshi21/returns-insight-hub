import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, PageHeading } from "@/components/dashboard-shell";
import { SummaryBanner } from "@/components/returns-ui";
import { aiSummary, reasonBreakdown, returnRecords } from "@/lib/returns-data";

export const Route = createFileRoute("/reasons")({
  head: () => ({
    meta: [
      { title: "Return Reasons Breakdown — Boomerang" },
      {
        name: "description",
        content:
          "Full distribution of return reasons across sizing, defects, description mismatches, late delivery and more.",
      },
      { property: "og:title", content: "Return Reasons Breakdown — Boomerang" },
      {
        property: "og:description",
        content: "Which causes drive the most returns, ranked with share of total.",
      },
    ],
  }),
  component: ReasonsPage,
});

function ReasonsPage() {
  const total = returnRecords.length;
  const ranked = [...reasonBreakdown].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...ranked.map((r) => r.count));

  return (
    <DashboardShell>
      <PageHeading
        eyebrow="Reasons"
        title="What is actually going wrong"
        lede="Every return comment is bucketed into one primary cause, ranked by volume."
      />

      <SummaryBanner text={aiSummary} />

      <section className="panel mt-4 p-5 md:p-7">
        <ul className="space-y-5">
          {ranked.map(({ category, count }) => (
            <li key={category}>
              <div className="flex items-end justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{category}</span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {count} · {Math.round((count / total) * 100)}%
                </span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${count === 0 ? 1.5 : (count / maxCount) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </DashboardShell>
  );
}
