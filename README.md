# Boomerang — Returns Intelligence Agent

An AI-powered returns intelligence dashboard for e-commerce operations teams. Built during a Buildathon with Lovable, TanStack Start, and the Lovable AI Gateway.

## What it does

Boomerang turns raw return comments into actionable ops intelligence. Instead of scrolling through tickets, teams get:

- **AI-generated verdicts** that summarize root cause, customer mood, and preventable issues.
- **Prioritized action queue** with impact and confidence scores.
- **Flagged product cards** that surface recurring defects, sizing issues, and supplier problems.
- **A grounded Q&A agent** that answers plain-English questions using the actual return dataset.
- **Multi-page dashboard** for overview, reasons, products, and the full return log.

## Demo

[Live preview](https://id-preview--69f136cc-2050-4ecd-902a-cfba35f24cb9.lovable.app)

## Key features

- AI analysis of 20+ realistic return records
- Severity classification and watch-out alerts
- Return reason breakdown with visual bar charts
- Product image cards with recommended fixes
- Searchable / sortable return log table
- "Ask the agent" console for grounded Q&A

## Tech stack

- [Lovable](https://lovable.dev) — visual builder + deployment
- [TanStack Start](https://tanstack.com/start) — full-stack React framework
- [Tailwind CSS](https://tailwindcss.com) — styling
- Lovable Cloud — backend / auth
- Lovable AI Gateway — Google Gemini-powered analysis

## Project structure

```
src/
  routes/           # Pages: Overview, Reasons, Products, Returns, Agent
  components/       # Dashboard shell, agent panel, shared UI
  lib/
    ai.functions.ts # Server functions for AI analysis and Q&A
    returns-data.ts # Sample return dataset
    product-images.ts # Product image mapping
  styles.css        # Custom Plum & Lilac design tokens
```

## Running locally

```sh
git clone <your-github-repo-url>
cd <repository-name>
bun install
bun run dev
```

The app runs at `http://localhost:8080`.

## How the AI works

- `analyzeReturns` sends the return dataset to the Lovable AI Gateway and asks for a structured verdict, themes, and action queue.
- `askAgent` grounds each user question in the return records so answers cite real order IDs and comments.

## Built by

[Khushi Bakshi](https://github.com/your-username)
