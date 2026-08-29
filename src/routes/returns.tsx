import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, PageHeading } from "@/components/dashboard-shell";
import { SeverityBadge } from "@/components/returns-ui";
import { returnRecords } from "@/lib/returns-data";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Return Log — Every Individual Return — Boomerang" },
      {
        name: "description",
        content:
          "The full return log: order id, product, customer comment, assigned category and severity for each return.",
      },
      { property: "og:title", content: "Return Log — Boomerang" },
      {
        property: "og:description",
        content: "Every individual return with its customer comment, category and severity.",
      },
    ],
  }),
  component: ReturnLogPage,
});

function ReturnLogPage() {
  return (
    <DashboardShell>
      <PageHeading
        eyebrow="Return log"
        title="Every return, in the customer's words"
        lede={`${returnRecords.length} records with the comment that triggered each category and severity.`}
      />

      <section className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead>
              <tr className="bg-surface text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Comment</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody>
              {returnRecords.map((r) => (
                <tr
                  key={r.orderId}
                  className="border-t border-border/70 align-top transition-colors hover:bg-surface/60"
                >
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
    </DashboardShell>
  );
}
