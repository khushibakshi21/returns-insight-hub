import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DashboardShell, PageHeading } from "@/components/dashboard-shell";
import { SeverityBadge } from "@/components/returns-ui";
import { flaggedProducts } from "@/lib/returns-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Flagged Products & Recommended Fixes — Boomerang" },
      {
        name: "description",
        content:
          "Products with recurring return patterns, the issue behind them and the recommended action for each.",
      },
      { property: "og:title", content: "Flagged Products — Boomerang" },
      {
        property: "og:description",
        content: "Recurring product issues paired with a concrete recommended fix.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <DashboardShell>
      <PageHeading
        eyebrow="Flagged"
        title="Products worth fixing first"
        lede="Each card groups related returns into one root cause and a single next action."
      />

      <section className="grid gap-4 md:grid-cols-2">
        {flaggedProducts.map((item) => (
          <article key={item.product} className="panel flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-foreground">{item.product}</h2>
              <SeverityBadge severity={item.severity} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.returns} related returns</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.issue}</p>
            <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-sm font-medium text-success">
              <ArrowRight className="mt-0.5 size-4 shrink-0" />
              {item.action}
            </p>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
