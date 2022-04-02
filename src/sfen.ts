import { Board, Color, Hand, Piece, PieceType } from "./types";

const SFEN_PIECE_MAP: { [key: string]: Piece } = {
  P: new Piece(Color.Black, PieceType.FU),
  L: new Piece(Color.Black, PieceType.KY),
  N: new Piece(Color.Black, PieceType.KE),
  S: new Piece(Color.Black, PieceType.GI),
  G: new Piece(Color.Black, PieceType.KI),
  B: new Piece(Color.Black, PieceType.KA),
  R: new Piece(Color.Black, PieceType.HI),
  K: new Piece(Color.Black, PieceType.OU),
  "+P": new Piece(Color.Black, PieceType.TO),
  "+L": new Piece(Color.Black, PieceType.NY),
  "+N": new Piece(Color.Black, PieceType.NK),
  "+S": new Piece(Color.Black, PieceType.NG),
  "+B": new Piece(Color.Black, PieceType.UM),
  "+R": new Piece(Color.Black, PieceType.RY),
  p: new Piece(Color.White, PieceType.FU),
  l: new Piece(Color.White, PieceType.KY),
  n: new Piece(Color.White, PieceType.KE),
  s: new Piece(Color.White, PieceType.GI),
  g: new Piece(Color.White, PieceType.KI),
  b: new Piece(Color.White, PieceType.KA),
  r: new Piece(Color.White, PieceType.HI),
  k: new Piece(Color.White, PieceType.OU),
  "+p": new Piece(Color.White, PieceType.TO),
  "+l": new Piece(Color.White, PieceType.NY),
  "+n": new Piece(Color.White, PieceType.NK),
  "+s": new Piece(Color.White, PieceType.NG),
  "+b": new Piece(Color.White, PieceType.UM),
  "+r": new Piece(Color.White, PieceType.RY),
} as const;

export function parseSfen(sfen: string): [Board, Hand, Hand] {
  const board = Array.from(Array(9), () => Array(9).fill(null));
  const hands = [
    {
      [PieceType.FU]: 0,
      [PieceType.KY]: 0,
      [PieceType.KE]: 0,
      [PieceType.GI]: 0,
      [PieceType.KI]: 0,
      [PieceType.KA]: 0,
      [PieceType.HI]: 0,
      [PieceType.OU]: 0,
    },
    {
      [PieceType.FU]: 0,
      [PieceType.KY]: 0,
      [PieceType.KE]: 0,
      [PieceType.GI]: 0,
      [PieceType.KI]: 0,
      [PieceType.KA]: 0,
      [PieceType.HI]: 0,
      [PieceType.OU]: 0,
    },
  ];
  const parts = sfen.split(" ");
  const rows = parts[0].split("/", 9);
  if (rows.length !== 9) {
    throw new Error("invalid sfen board");
  }
  rows.forEach((row, i) => {
    let j = 0;
    Array.from(row.matchAll(/(\+?.)/g), (m) => m[0]).forEach((s) => {
      if (s.match(/^[1-9]$/)) {
        j += Number(s);
      } else {
        const piece = SFEN_PIECE_MAP[s];
        if (!piece) {
          throw new Error(`invalid sfen piece: ${s}`);
        }
        board[i][j] = piece;
        j++;
      }
    });
    if (j !== 9) {
      throw new Error(`invalid sfen row: ${row}`);
    }
  });
  // TODO: hands
  return [board, hands[0], hands[1]];
}
