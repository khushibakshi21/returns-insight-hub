import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DashboardShell, PageHeading } from "@/components/dashboard-shell";
import { SeverityBadge } from "@/components/returns-ui";
import { productImages } from "@/lib/product-images";
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
          <article
            key={item.product}
            className="panel group relative flex flex-col overflow-hidden transition-colors hover:border-primary/30"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-surface">
              <img
                src={productImages[item.product]}
                alt={`${item.product} product photo`}
                loading="lazy"
                width={768}
                height={576}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-foreground">{item.product}</h2>
                <SeverityBadge severity={item.severity} />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
            <p className="text-xs text-muted-foreground">{item.returns} related returns</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.issue}</p>

              <p className="mt-auto flex items-start gap-2 border-t border-border pt-4 text-sm font-medium text-success">
                <ArrowRight className="mt-0.5 size-4 shrink-0" />
                {item.action}
              </p>
            </div>
          </article>

        ))}
      </section>
    </DashboardShell>
  );
}
