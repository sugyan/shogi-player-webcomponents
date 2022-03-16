export const Piece = {
  BFU: "BFU",
  BKY: "BKY",
  BKE: "BKE",
  BGI: "BGI",
  BKI: "BKI",
  BKA: "BKA",
  BHI: "BHI",
  BOU: "BOU",
  BTO: "BTO",
  BNY: "BNY",
  BNK: "BNK",
  BNG: "BNG",
  BUM: "BUM",
  BRY: "BRY",
  WFU: "WFU",
  WKY: "WKY",
  WKE: "WKE",
  WGI: "WGI",
  WKI: "WKI",
  WKA: "WKA",
  WHI: "WHI",
  WOU: "WOU",
  WTO: "WTO",
  WNY: "WNY",
  WNK: "WNK",
  WNG: "WNG",
  WUM: "WUM",
  WRY: "WRY",
} as const;
export type Piece = typeof Piece[keyof typeof Piece];

export type BoardCol = Piece | null;

export type BoardRow = [
  BoardCol,
  BoardCol,
  BoardCol,
  BoardCol,
  BoardCol,
  BoardCol,
  BoardCol,
  BoardCol,
  BoardCol
];

export type Board = [
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow
];
