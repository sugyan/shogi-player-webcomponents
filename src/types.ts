export const File = {
  File1: 1,
  File2: 2,
  File3: 3,
  File4: 4,
  File5: 5,
  File6: 6,
  File7: 7,
  File8: 8,
  File9: 9,
} as const;
export type File = typeof File[keyof typeof File];

export const Rank = {
  Rank1: 1,
  Rank2: 2,
  Rank3: 3,
  Rank4: 4,
  Rank5: 5,
  Rank6: 6,
  Rank7: 7,
  Rank8: 8,
  Rank9: 9,
} as const;
export type Rank = typeof Rank[keyof typeof Rank];

export interface Square {
  file: File;
  rank: Rank;
}

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
