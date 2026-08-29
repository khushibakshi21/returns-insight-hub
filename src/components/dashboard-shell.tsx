import { Link } from "@tanstack/react-router";
import { Sparkles, Undo2 } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Overview" },
  { to: "/reasons", label: "Reasons" },
  { to: "/products", label: "Flagged" },
  { to: "/returns", label: "Return log" },
] as const;

export function analyzeReturns() {
  // Placeholder — will be wired to the backend analysis function.
  console.log("Analyze returns: backend function not connected yet.");
}

export function AnalyzeButton() {
  return (
    <button
      onClick={analyzeReturns}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Sparkles className="size-4" />
      Analyze returns
    </button>
  );
}

export function PageHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.1] text-foreground md:text-[2.75rem]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{lede}</p>
      ) : null}
    </div>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="glow-top" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-10 md:pt-8">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
              <Undo2 className="size-4" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-foreground">
              Boomerang
              <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">
                Returns Intelligence
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ul className="flex items-center gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "bg-secondary text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                    className="block rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="hidden sm:block">
              <AnalyzeButton />
            </div>
          </div>
        </nav>

        <div className="mt-10">{children}</div>

        <div className="mt-8 sm:hidden">
          <AnalyzeButton />
        </div>

        <footer className="mt-12 border-t border-border pt-5 text-xs text-muted-foreground">
          Boomerang reads customer return comments and clusters them into fixable causes.
        </footer>
      </div>
    </div>
  );
}
