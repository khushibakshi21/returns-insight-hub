import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CornerDownLeft, Loader2, Sparkles } from "lucide-react";
import { DashboardShell, PageHeading } from "@/components/dashboard-shell";
import { askAgent } from "@/lib/ai.functions";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      { title: "Ask the agent — Boomerang Returns Intelligence" },
      {
        name: "description",
        content:
          "Ask questions about your return comments in plain English and get grounded, specific answers from the returns agent.",
      },
      { property: "og:title", content: "Ask the returns agent" },
      {
        property: "og:description",
        content: "Plain-English questions about why customers send things back.",
      },
    ],
  }),
  component: AgentPage,
});

const suggestions = [
  "Which product is costing us the most avoidable returns?",
  "Summarise the sizing complaints in one paragraph.",
  "Draft a message to the Nomad Pulse supplier.",
  "What should we fix first this week, and why?",
];

interface Turn {
  question: string;
  answer: string | null;
  error?: string;
}

function AgentPage() {
  const ask = useServerFn(askAgent);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);

  const send = (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    setTurns((t) => [...t, { question: q, answer: null }]);
    ask({ data: { question: q } })
      .then((res) => {
        setTurns((t) =>
          t.map((turn, i) => (i === t.length - 1 ? { ...turn, answer: res.answer } : turn)),
        );
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "The agent could not answer.";
        setTurns((t) =>
          t.map((turn, i) => (i === t.length - 1 ? { ...turn, answer: "", error: message } : turn)),
        );
      })
      .finally(() => setBusy(false));
  };

  return (
    <DashboardShell>
      <PageHeading
        eyebrow="Ask the agent"
        title="Interrogate your returns in plain English"
        lede="The agent reads every return comment before answering, so ask about causes, products, wording or supplier follow-ups."
      />

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            disabled={busy}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {turns.length === 0 ? (
          <div className="panel flex items-start gap-3 p-6 text-sm text-muted-foreground">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
            Nothing asked yet. Pick a prompt above or type your own question below.
          </div>
        ) : null}

        {turns.map((turn, i) => (
          <div key={i} className="space-y-3">
            <p className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-elevated px-4 py-2.5 text-sm text-foreground">
              {turn.question}
            </p>
            <div className="panel relative overflow-hidden p-5">
              <span className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
              <p className="rule-label pl-2">Boomerang</p>
              {turn.answer === null ? (
                <p className="mt-2 flex items-center gap-2 pl-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-primary" /> Reading 20 return
                  comments…
                </p>
              ) : turn.error ? (
                <p className="mt-2 pl-2 text-sm text-destructive">{turn.error}</p>
              ) : (
                <p className="mt-2 whitespace-pre-wrap pl-2 text-sm leading-relaxed text-foreground">
                  {turn.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-4 mt-6 flex items-center gap-2 rounded-lg border border-border bg-surface/95 p-2 backdrop-blur"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a product, a reason, or what to fix first…"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={busy || input.trim().length < 2}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <CornerDownLeft className="size-4" />}
          Ask
        </button>
      </form>
    </DashboardShell>
  );
}
