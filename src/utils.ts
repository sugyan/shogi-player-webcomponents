import { File, Rank, Square, Piece } from "./types";

const FILES = [
  File.File1,
  File.File2,
  File.File3,
  File.File4,
  File.File5,
  File.File6,
  File.File7,
  File.File8,
  File.File9,
] as const;

const RANKS = [
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

function row2rank(row: number): Rank {
  return RANKS[row];
}

function rank2row(rank: Rank): number {
  switch (rank) {
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

function col2file(col: number): File {
  return FILES[8 - col];
}

function file2col(file: File): number {
  switch (file) {
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

export function rc2sq(row: number, col: number): Square {
  return {
    file: col2file(col),
    rank: row2rank(row),
  };
}

export function sq2rc(sq: Square): [row: number, col: number] {
  return [rank2row(sq.rank), file2col(sq.file)];
}

export function nextPiece(piece: Piece): Piece {
  switch (piece) {
    case Piece.BFU:
      return Piece.BTO;
    case Piece.BKY:
      return Piece.BNY;
    case Piece.BKE:
      return Piece.BNK;
    case Piece.BGI:
      return Piece.BNG;
    case Piece.BKI:
      return Piece.WKI;
    case Piece.BKA:
      return Piece.BUM;
    case Piece.BHI:
      return Piece.BRY;
    case Piece.BOU:
      return Piece.WOU;
    case Piece.BTO:
      return Piece.WFU;
    case Piece.BNY:
      return Piece.WKY;
    case Piece.BNK:
      return Piece.WKE;
    case Piece.BNG:
      return Piece.WGI;
    case Piece.BUM:
      return Piece.WKA;
    case Piece.BRY:
      return Piece.WHI;
    case Piece.WFU:
      return Piece.WTO;
    case Piece.WKY:
      return Piece.WNY;
    case Piece.WKE:
      return Piece.WNK;
    case Piece.WGI:
      return Piece.WNG;
    case Piece.WKI:
      return Piece.BKI;
    case Piece.WKA:
      return Piece.WUM;
    case Piece.WHI:
      return Piece.WRY;
    case Piece.WOU:
      return Piece.BOU;
    case Piece.WTO:
      return Piece.BFU;
    case Piece.WNY:
      return Piece.BKY;
    case Piece.WNK:
      return Piece.BKE;
    case Piece.WNG:
      return Piece.BGI;
    case Piece.WUM:
      return Piece.BKA;
    case Piece.WRY:
      return Piece.BHI;
  }
}
