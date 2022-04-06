import { Color, Piece, PieceType } from "./types";

export const BFU = new Piece(Color.Black, PieceType.FU);
export const BKY = new Piece(Color.Black, PieceType.KY);
export const BKE = new Piece(Color.Black, PieceType.KE);
export const BGI = new Piece(Color.Black, PieceType.GI);
export const BKI = new Piece(Color.Black, PieceType.KI);
export const BKA = new Piece(Color.Black, PieceType.KA);
export const BHI = new Piece(Color.Black, PieceType.HI);
export const BOU = new Piece(Color.Black, PieceType.OU);
export const BTO = new Piece(Color.Black, PieceType.TO);
export const BNY = new Piece(Color.Black, PieceType.NY);
export const BNK = new Piece(Color.Black, PieceType.NK);
export const BNG = new Piece(Color.Black, PieceType.NG);
export const BUM = new Piece(Color.Black, PieceType.UM);
export const BRY = new Piece(Color.Black, PieceType.RY);
export const WFU = new Piece(Color.White, PieceType.FU);
export const WKY = new Piece(Color.White, PieceType.KY);
export const WKE = new Piece(Color.White, PieceType.KE);
export const WGI = new Piece(Color.White, PieceType.GI);
export const WKI = new Piece(Color.White, PieceType.KI);
export const WKA = new Piece(Color.White, PieceType.KA);
export const WHI = new Piece(Color.White, PieceType.HI);
export const WOU = new Piece(Color.White, PieceType.OU);
export const WTO = new Piece(Color.White, PieceType.TO);
export const WNY = new Piece(Color.White, PieceType.NY);
export const WNK = new Piece(Color.White, PieceType.NK);
export const WNG = new Piece(Color.White, PieceType.NG);
export const WUM = new Piece(Color.White, PieceType.UM);
export const WRY = new Piece(Color.White, PieceType.RY);

export const HAND_KEYS = [
  PieceType.FU,
  PieceType.KY,
  PieceType.KE,
  PieceType.GI,
  PieceType.KI,
  PieceType.KA,
  PieceType.HI,
  PieceType.OU,
] as const;
