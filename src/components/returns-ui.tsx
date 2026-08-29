import { Sparkles } from "lucide-react";
import type { Severity } from "@/lib/returns-data";

const severityStyles: Record<Severity, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/40",
  medium: "bg-primary/15 text-primary border-primary/40",
  low: "bg-success/15 text-success border-success/40",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}

export function SummaryBanner({ text }: { text: string }) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-primary/25 bg-primary/[0.07] p-5">
      <span className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
      <div className="flex items-start gap-3 pl-2">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
        <div>
          <p className="rule-label">Agent summary</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">{text}</p>
        </div>
      </div>
    </section>
  );
}
