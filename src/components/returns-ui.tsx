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
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium capitalize ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}

export function SummaryBanner({ text }: { text: string }) {
  return (
    <section className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4">
      <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </section>
  );
}
