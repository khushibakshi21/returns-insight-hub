export type Severity = "high" | "medium" | "low";

export type ReturnCategory =
  | "Size/Fit"
  | "Defective"
  | "Not as described"
  | "Late delivery"
  | "Changed mind"
  | "Quality issue"
  | "Wrong item"
  | "Other";

export interface ReturnRecord {
  orderId: string;
  product: string;
  comment: string;
  category: ReturnCategory;
  severity: Severity;
}

export const returnRecords: ReturnRecord[] = [
  {
    orderId: "ORD-10241",
    product: "Alder Wool Overcoat",
    comment: "Ordered a medium like always, shoulders were way too tight and sleeves too short.",
    category: "Size/Fit",
    severity: "medium",
  },
  {
    orderId: "ORD-10248",
    product: "Alder Wool Overcoat",
    comment: "Runs at least one size small. Had to send back and reorder a large.",
    category: "Size/Fit",
    severity: "high",
  },
  {
    orderId: "ORD-10255",
    product: "Alder Wool Overcoat",
    comment: "Listing said charcoal, what arrived is closer to navy blue.",
    category: "Not as described",
    severity: "medium",
  },
  {
    orderId: "ORD-10263",
    product: "Alder Wool Overcoat",
    comment: "Lining came apart at the seam after wearing it twice.",
    category: "Quality issue",
    severity: "high",
  },
  {
    orderId: "ORD-10270",
    product: "Nomad Pulse Speaker",
    comment: "Left channel crackles at any volume above half. Clearly faulty.",
    category: "Defective",
    severity: "high",
  },
  {
    orderId: "ORD-10274",
    product: "Nomad Pulse Speaker",
    comment: "Battery dies in about two hours, not the ten hours advertised.",
    category: "Not as described",
    severity: "high",
  },
  {
    orderId: "ORD-10279",
    product: "Nomad Pulse Speaker",
    comment: "Would not pair with my phone at all, tried resetting three times.",
    category: "Defective",
    severity: "high",
  },
  {
    orderId: "ORD-10283",
    product: "Halden Arc Lamp",
    comment: "Arrived with the shade dented, box looked fine so it was packed that way.",
    category: "Defective",
    severity: "medium",
  },
  {
    orderId: "ORD-10288",
    product: "Halden Arc Lamp",
    comment: "Base wobbles badly on a flat floor, feels like it will tip over.",
    category: "Quality issue",
    severity: "high",
  },
  {
    orderId: "ORD-10292",
    product: "Halden Arc Lamp",
    comment: "Much larger than I pictured for the corner, my mistake.",
    category: "Changed mind",
    severity: "low",
  },
  {
    orderId: "ORD-10297",
    product: "Trailkin Runner 4",
    comment: "Half a size small compared to my other running shoes, toes hit the front.",
    category: "Size/Fit",
    severity: "medium",
  },
  {
    orderId: "ORD-10301",
    product: "Trailkin Runner 4",
    comment: "Width is far too narrow, painful after one short run.",
    category: "Size/Fit",
    severity: "high",
  },
  {
    orderId: "ORD-10306",
    product: "Trailkin Runner 4",
    comment: "Received the men's version instead of the women's I ordered.",
    category: "Wrong item",
    severity: "high",
  },
  {
    orderId: "ORD-10311",
    product: "Trailkin Runner 4",
    comment: "Sole started separating at the heel within a week.",
    category: "Quality issue",
    severity: "high",
  },
  {
    orderId: "ORD-10316",
    product: "Sable Stoneware Mug Set",
    comment: "Two of the four mugs arrived chipped, packaging had no dividers.",
    category: "Defective",
    severity: "high",
  },
  {
    orderId: "ORD-10320",
    product: "Sable Stoneware Mug Set",
    comment: "Mugs are much smaller than the photos suggest, barely holds a coffee.",
    category: "Not as described",
    severity: "medium",
  },
  {
    orderId: "ORD-10325",
    product: "Sable Stoneware Mug Set",
    comment: "Ordered as a gift, arrived four days after the birthday.",
    category: "Late delivery",
    severity: "medium",
  },
  {
    orderId: "ORD-10329",
    product: "Loomfield Linen Duvet",
    comment: "Delivery slipped twice, gave up and bought locally.",
    category: "Late delivery",
    severity: "medium",
  },
  {
    orderId: "ORD-10334",
    product: "Loomfield Linen Duvet",
    comment: "Decided on a different colour scheme for the bedroom, unused and folded.",
    category: "Changed mind",
    severity: "low",
  },
  {
    orderId: "ORD-10338",
    product: "Kestrel Weekender Bag",
    comment: "Zip pull snapped off the first time I loaded it up.",
    category: "Other",
    severity: "medium",
  },
];

export const reasonBreakdown: { category: ReturnCategory; count: number }[] = [
  "Size/Fit",
  "Defective",
  "Not as described",
  "Late delivery",
  "Changed mind",
  "Quality issue",
  "Wrong item",
  "Other",
].map((category) => ({
  category: category as ReturnCategory,
  count: returnRecords.filter((r) => r.category === category).length,
}));

export interface FlaggedProduct {
  product: string;
  issue: string;
  action: string;
  severity: Severity;
  returns: number;
}

export const flaggedProducts: FlaggedProduct[] = [
  {
    product: "Trailkin Runner 4",
    issue: "Sizing runs small and narrow across 3 of 4 returns, plus one sole failure.",
    action: "Add a half-size-up note and a width guide to the product page",
    severity: "high",
    returns: 4,
  },
  {
    product: "Nomad Pulse Speaker",
    issue: "Audio crackle, pairing failures and battery life far below the listed 10 hours.",
    action: "Hold current batch and audit supplier QC before restock",
    severity: "high",
    returns: 3,
  },
  {
    product: "Alder Wool Overcoat",
    issue: "Fits a full size small and the charcoal colourway reads navy in photos.",
    action: "Reshoot colour swatches and update the size chart",
    severity: "high",
    returns: 4,
  },
  {
    product: "Sable Stoneware Mug Set",
    issue: "Chips in transit and repeated complaints that capacity looks larger online.",
    action: "Switch to divided inserts and list mug volume in the title",
    severity: "medium",
    returns: 3,
  },
  {
    product: "Halden Arc Lamp",
    issue: "Wobbling base and shade dents suggest a packaging and assembly gap.",
    action: "Add a weighted base spec check and dimensional overlay image",
    severity: "medium",
    returns: 3,
  },
];

export const aiSummary =
  "Sizing accuracy and supplier quality drive 70% of returns this month — fixing the Trailkin size chart and pausing the Nomad Pulse batch would remove an estimated 9 of 20 returns.";
