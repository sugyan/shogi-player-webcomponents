import {
  File,
  Rank,
  Square,
  Color,
  Piece,
  PieceType,
  HandPieceType,
} from "./types";
import { bfu } from "./resources/bfu";
import { bky } from "./resources/bky";
import { bke } from "./resources/bke";
import { bgi } from "./resources/bgi";
import { bki } from "./resources/bki";
import { bka } from "./resources/bka";
import { bhi } from "./resources/bhi";
import { bou } from "./resources/bou";
import { bto } from "./resources/bto";
import { bny } from "./resources/bny";
import { bnk } from "./resources/bnk";
import { bng } from "./resources/bng";
import { bum } from "./resources/bum";
import { bry } from "./resources/bry";
import { wfu } from "./resources/wfu";
import { wky } from "./resources/wky";
import { wke } from "./resources/wke";
import { wgi } from "./resources/wgi";
import { wki } from "./resources/wki";
import { wka } from "./resources/wka";
import { whi } from "./resources/whi";
import { wou } from "./resources/wou";
import { wto } from "./resources/wto";
import { wny } from "./resources/wny";
import { wnk } from "./resources/wnk";
import { wng } from "./resources/wng";
import { wum } from "./resources/wum";
import { wry } from "./resources/wry";

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
  return new Square(col2file(col), row2rank(row));
}

export function sq2rc(sq: Square): [row: number, col: number] {
  return [rank2row(sq.rank), file2col(sq.file)];
}

export function p2cpt(p: Piece): [c: Color, pt: PieceType] {
  switch (p) {
    case Piece.BFU:
      return [Color.Black, PieceType.FU];
    case Piece.BKY:
      return [Color.Black, PieceType.KY];
    case Piece.BKE:
      return [Color.Black, PieceType.KE];
    case Piece.BGI:
      return [Color.Black, PieceType.GI];
    case Piece.BKI:
      return [Color.Black, PieceType.KI];
    case Piece.BKA:
      return [Color.Black, PieceType.KA];
    case Piece.BHI:
      return [Color.Black, PieceType.HI];
    case Piece.BOU:
      return [Color.Black, PieceType.OU];
    case Piece.BTO:
      return [Color.Black, PieceType.TO];
    case Piece.BNY:
      return [Color.Black, PieceType.NY];
    case Piece.BNK:
      return [Color.Black, PieceType.NK];
    case Piece.BNG:
      return [Color.Black, PieceType.NG];
    case Piece.BUM:
      return [Color.Black, PieceType.UM];
    case Piece.BRY:
      return [Color.Black, PieceType.RY];
    case Piece.WFU:
      return [Color.White, PieceType.FU];
    case Piece.WKY:
      return [Color.White, PieceType.KY];
    case Piece.WKE:
      return [Color.White, PieceType.KE];
    case Piece.WGI:
      return [Color.White, PieceType.GI];
    case Piece.WKI:
      return [Color.White, PieceType.KI];
    case Piece.WKA:
      return [Color.White, PieceType.KA];
    case Piece.WHI:
      return [Color.White, PieceType.HI];
    case Piece.WOU:
      return [Color.White, PieceType.OU];
    case Piece.WTO:
      return [Color.White, PieceType.TO];
    case Piece.WNY:
      return [Color.White, PieceType.NY];
    case Piece.WNK:
      return [Color.White, PieceType.NK];
    case Piece.WNG:
      return [Color.White, PieceType.NG];
    case Piece.WUM:
      return [Color.White, PieceType.UM];
    case Piece.WRY:
      return [Color.White, PieceType.RY];
  }
}

export function pt2hpt(pt: PieceType): HandPieceType {
  switch (pt) {
    case PieceType.FU:
    case PieceType.TO:
      return PieceType.FU;
    case PieceType.KY:
    case PieceType.NY:
      return PieceType.FU;
    case PieceType.KE:
    case PieceType.NK:
      return PieceType.KE;
    case PieceType.GI:
    case PieceType.NG:
      return PieceType.GI;
    case PieceType.KI:
      return PieceType.KI;
    case PieceType.KA:
    case PieceType.UM:
      return PieceType.KA;
    case PieceType.HI:
    case PieceType.RY:
      return PieceType.HI;
    case PieceType.OU:
      return PieceType.OU;
  }
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

export function pieceImage(piece: Piece | null) {
  switch (piece) {
    case Piece.BFU:
      return bfu;
    case Piece.BKY:
      return bky;
    case Piece.BKE:
      return bke;
    case Piece.BGI:
      return bgi;
    case Piece.BKI:
      return bki;
    case Piece.BKA:
      return bka;
    case Piece.BHI:
      return bhi;
    case Piece.BOU:
      return bou;
    case Piece.BTO:
      return bto;
    case Piece.BNY:
      return bny;
    case Piece.BNK:
      return bnk;
    case Piece.BNG:
      return bng;
    case Piece.BUM:
      return bum;
    case Piece.BRY:
      return bry;
    case Piece.WFU:
      return wfu;
    case Piece.WKY:
      return wky;
    case Piece.WKE:
      return wke;
    case Piece.WGI:
      return wgi;
    case Piece.WKI:
      return wki;
    case Piece.WKA:
      return wka;
    case Piece.WHI:
      return whi;
    case Piece.WOU:
      return wou;
    case Piece.WTO:
      return wto;
    case Piece.WNY:
      return wny;
    case Piece.WNK:
      return wnk;
    case Piece.WNG:
      return wng;
    case Piece.WUM:
      return wum;
    case Piece.WRY:
      return wry;
  }
  return null;
}
