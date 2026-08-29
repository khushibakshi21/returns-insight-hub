import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ListOrdered,
  ScanLine,
  Sparkles,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Overview", Icon: LayoutDashboard, exact: true },
  { to: "/reasons", label: "Reasons", Icon: ScanLine, exact: false },
  { to: "/products", label: "Flagged", Icon: TriangleAlert, exact: false },
  { to: "/returns", label: "Return log", Icon: ListOrdered, exact: false },
] as const;

export function analyzeReturns() {
  // Placeholder — will be wired to the backend analysis function.
  console.log("Analyze returns: backend function not connected yet.");
}

export function AnalyzeButton({ full = false }: { full?: boolean }) {
  return (
    <button
      onClick={analyzeReturns}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${full ? "w-full" : ""}`}
    >
      <Sparkles className="size-4" />
      Analyze returns
    </button>
  );
}

function NavLinks({
  orientation,
  onNavigate,
}: {
  orientation: "vertical" | "grid";
  onNavigate?: () => void;
}) {
  return (
    <ul className={orientation === "vertical" ? "space-y-1" : "grid grid-cols-2 gap-2"}>
      {navItems.map(({ to, label, Icon, exact }) => (
        <li key={to}>
          <Link
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact }}
            activeProps={{
              className: "bg-elevated text-foreground border-l-primary",
            }}
            inactiveProps={{
              className: "text-muted-foreground border-l-transparent hover:text-foreground",
            }}
            className="flex items-center gap-2.5 rounded-md border-l-2 px-3 py-2.5 text-sm font-medium transition-colors"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}


function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
        <Undo2 className="size-4" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-semibold tracking-tight text-foreground">
          Boomerang
        </span>
        <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          Returns Intelligence
        </span>
      </span>
    </Link>
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
    <header className="mb-7 border-b border-border pb-7">
      <p className="rule-label">{eyebrow}</p>
      <h1 className="mt-3 max-w-2xl text-[1.9rem] font-semibold leading-[1.1] text-foreground md:text-[2.6rem]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{lede}</p>
      ) : null}
    </header>

  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur lg:h-screen lg:w-[16rem] lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-4 px-5 py-4 lg:block lg:px-5 lg:py-6">
          <Wordmark />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-elevated text-foreground transition-colors hover:border-primary/40 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <div className="hidden lg:mt-8 lg:block">
            <NavLinks orientation="vertical" />
          </div>
          <div className="hidden lg:mt-8 lg:block">
            <AnalyzeButton full />
            <p className="mt-3 text-[0.7rem] leading-relaxed text-muted-foreground">
              Re-clusters every return comment into causes and recommended fixes.
            </p>
          </div>
        </div>
        {open ? (
          <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
            <NavLinks orientation="grid" onNavigate={() => setOpen(false)} />
          </div>
        ) : null}
      </aside>


      <main className="relative min-w-0 flex-1">
        <div className="hairline-grid pointer-events-none absolute inset-x-0 top-0 h-64 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-8 md:px-10 md:pt-12">
          {children}
          <div className="mt-8 lg:hidden">
            <AnalyzeButton full />
          </div>
        </div>
      </main>
    </div>
  );
}
