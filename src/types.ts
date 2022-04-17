export const Mode = {
  Show: "show",
  Edit: "edit",
  Play: "play",
  Kifu: "kifu",
} as const;
export type Mode = typeof Mode[keyof typeof Mode];

export const Color = {
  Black: "black",
  White: "white",
} as const;
export type Color = typeof Color[keyof typeof Color];

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

export class Square {
  static FILES = [
    File.File9,
    File.File8,
    File.File7,
    File.File6,
    File.File5,
    File.File4,
    File.File3,
    File.File2,
    File.File1,
  ] as const;
  static RANKS = [
    Rank.Rank1,
    Rank.Rank2,
    Rank.Rank3,
    Rank.Rank4,
    Rank.Rank5,
    Rank.Rank6,
    Rank.Rank7,
    Rank.Rank8,
    Rank.Rank9,
  ] as const;
  readonly file: File;
  readonly rank: Rank;
  constructor(row: number, col: number) {
    this.file = Square.FILES[col];
    this.rank = Square.RANKS[row];
  }
  equals(sq: Square): boolean {
    return this.file === sq.file && this.rank === sq.rank;
  }
  get row() {
    switch (this.rank) {
      case Rank.Rank1:
        return 0;
      case Rank.Rank2:
        return 1;
      case Rank.Rank3:
        return 2;
      case Rank.Rank4:
        return 3;
      case Rank.Rank5:
        return 4;
      case Rank.Rank6:
        return 5;
      case Rank.Rank7:
        return 6;
      case Rank.Rank8:
        return 7;
      case Rank.Rank9:
        return 8;
    }
  }
  get col() {
    switch (this.file) {
      case File.File1:
        return 8;
      case File.File2:
        return 7;
      case File.File3:
        return 6;
      case File.File4:
        return 5;
      case File.File5:
        return 4;
      case File.File6:
        return 3;
      case File.File7:
        return 2;
      case File.File8:
        return 1;
      case File.File9:
        return 0;
    }
  }
}

export const PieceType = {
  FU: "FU",
  KY: "KY",
  KE: "KE",
  GI: "GI",
  KI: "KI",
  KA: "KA",
  HI: "HI",
  OU: "OU",
  TO: "TO",
  NY: "NY",
  NK: "NK",
  NG: "NG",
  UM: "UM",
  RY: "RY",
} as const;
export type PieceType = typeof PieceType[keyof typeof PieceType];
export type HandPieceType = Extract<
  PieceType,
  "FU" | "KY" | "KE" | "GI" | "KI" | "KA" | "HI" | "OU"
>;

export class Piece {
  readonly color: Color;
  readonly pieceType: PieceType;

  constructor(color: Color, pieceType: PieceType) {
    this.color = color;
    this.pieceType = pieceType;
  }
  equals(p: Piece): boolean {
    return this.color === p.color && this.pieceType === p.pieceType;
  }
}

export type BoardPiece = Piece | null;
export type Board = BoardPiece[][];

export type Hand = { [key in HandPieceType]: number };
