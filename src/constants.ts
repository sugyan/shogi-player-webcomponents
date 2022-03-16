import { Board, Piece } from "./types";

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
