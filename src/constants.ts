import { Board, Piece, PieceType, Hand } from "./types";

export const BOARD_NULL: Board = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

// prettier-ignore
export const BOARD_INIT: Board = [
  [Piece.WKY, Piece.WKE, Piece.WGI, Piece.WKI, Piece.WOU, Piece.WKI, Piece.WGI, Piece.WKE, Piece.WKY],
  [     null, Piece.WHI,      null,      null,      null,      null,      null, Piece.WKA,      null],
  [Piece.WFU, Piece.WFU, Piece.WFU, Piece.WFU, Piece.WFU, Piece.WFU, Piece.WFU, Piece.WFU, Piece.WFU],
  [     null,      null,      null,      null,      null,      null,      null,      null,      null],
  [     null,      null,      null,      null,      null,      null,      null,      null,      null],
  [     null,      null,      null,      null,      null,      null,      null,      null,      null],
  [Piece.BFU, Piece.BFU, Piece.BFU, Piece.BFU, Piece.BFU, Piece.BFU, Piece.BFU, Piece.BFU, Piece.BFU],
  [     null, Piece.BKA,      null,      null,      null,      null,      null, Piece.BHI,      null],
  [Piece.BKY, Piece.BKE, Piece.BGI, Piece.BKI, Piece.BOU, Piece.BKI, Piece.BGI, Piece.BKE, Piece.BKY],
];

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

export const HAND_ZERO: Hand = {
  [PieceType.FU]: 0,
  [PieceType.KY]: 0,
  [PieceType.KE]: 0,
  [PieceType.GI]: 0,
  [PieceType.KI]: 0,
  [PieceType.KA]: 0,
  [PieceType.HI]: 0,
  [PieceType.OU]: 0,
};

export const HAND_ALL = {
  [PieceType.FU]: 18,
  [PieceType.KY]: 2,
  [PieceType.KE]: 2,
  [PieceType.GI]: 2,
  [PieceType.KI]: 2,
  [PieceType.KA]: 1,
  [PieceType.HI]: 1,
  [PieceType.OU]: 1,
};
