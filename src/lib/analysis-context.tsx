import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { analyzeReturns, type AnalysisResult } from "@/lib/ai.functions";

interface AnalysisState {
  result: AnalysisResult | null;
  status: "idle" | "running" | "done" | "error";
  error: string | null;
  run: () => void;
}

const AnalysisContext = createContext<AnalysisState | null>(null);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const analyze = useServerFn(analyzeReturns);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisState["status"]>("idle");
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    setStatus("running");
    setError(null);
    analyze()
      .then((res) => {
        setResult(res);
        setStatus("done");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Analysis failed.");
        setStatus("error");
      });
  }, [analyze]);

  const value = useMemo(
    () => ({ result, status, error, run }),
    [result, status, error, run],
  );

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used inside AnalysisProvider");
  return ctx;
}
