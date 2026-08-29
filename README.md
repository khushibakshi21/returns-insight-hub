# Returns Insight Hub

Build a "Returns Intelligence Agent" dashboard for an e-commerce ops team.

Dark theme: background #12181F, cards #1A222B, accent amber #E2A33D, 

alert red #C1443B, sage green #6FA287, text off-white #EDEAE2.

Layout:

- Header with title "Why customers are sending things back" and an 

  "Analyze returns" button (amber, top right)

- 3 KPI cards in a row: Returns analyzed, Products with recurring issues, 

  High-severity cases

- A one-line AI-generated summary banner

- Two columns: left is a bar chart of return reasons (Size/Fit, Defective, 

  Not as described, Late delivery, Changed mind, Quality issue, Wrong item, 

  Other), right is a list of "flagged product" cards, each showing the 

  product name, the issue, and a recommended action with an arrow

- Below that, a table of all individual returns: order id, product, 

  comment, category, severity badge

Start with 20 sample return records across 6-7 fictional products 

(e.g. a coat, a speaker, a lamp, running shoes, a mug set) with realistic 

customer comments about sizing, defects, wrong color, late delivery, 

changed mind.

Leave the "Analyze returns" button wired to a placeholder function for now 

— I'll connect it to a backend function next.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69f136cc-2050-4ecd-902a-cfba35f24cb9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
