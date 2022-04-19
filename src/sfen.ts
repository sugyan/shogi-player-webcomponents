import {
  Board,
  BoardPiece,
  Color,
  Hand,
  HandPieceType,
  Piece,
  PieceType,
} from "./types";
// prettier-ignore
import {
  BFU, BKY, BKE, BGI, BKI, BKA, BHI, BOU, BTO, BNY, BNK, BNG, BUM, BRY,
  WFU, WKY, WKE, WGI, WKI, WKA, WHI, WOU, WTO, WNY, WNK, WNG, WUM, WRY,
  HAND_KEYS,
} from "./constants";

const SFEN_PIECE_MAP: { [key: string]: Piece } = {
  P: BFU,
  L: BKY,
  N: BKE,
  S: BGI,
  G: BKI,
  B: BKA,
  R: BHI,
  K: BOU,
  "+P": BTO,
  "+L": BNY,
  "+N": BNK,
  "+S": BNG,
  "+B": BUM,
  "+R": BRY,
  p: WFU,
  l: WKY,
  n: WKE,
  s: WGI,
  g: WKI,
  b: WKA,
  r: WHI,
  k: WOU,
  "+p": WTO,
  "+l": WNY,
  "+n": WNK,
  "+s": WNG,
  "+b": WUM,
  "+r": WRY,
} as const;

function pt2sfen(pt: PieceType): string {
  switch (pt) {
    case PieceType.FU:
      return "p";
    case PieceType.KY:
      return "l";
    case PieceType.KE:
      return "n";
    case PieceType.GI:
      return "s";
    case PieceType.KI:
      return "g";
    case PieceType.KA:
      return "b";
    case PieceType.HI:
      return "r";
    case PieceType.OU:
      return "k";
    case PieceType.TO:
      return "+p";
    case PieceType.NY:
      return "+l";
    case PieceType.NK:
      return "+n";
    case PieceType.NG:
      return "+s";
    case PieceType.UM:
      return "+b";
    case PieceType.RY:
      return "+r";
  }
}

function p2sfen(p: Piece): string {
  const s = pt2sfen(p.pieceType);
  switch (p.color) {
    case Color.Black:
      return s.toUpperCase();
    case Color.White:
      return s;
  }
}

export function parseSfen(sfen: string): [Board, [Hand, Hand], Color] {
  const board = Array.from(Array(9), () => Array(9).fill(null));
  const hands: [Hand, Hand] = [
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
  let sideToMove: Color;
  switch (parts[1]) {
    case "b":
      sideToMove = Color.Black;
      break;
    case "w":
      sideToMove = Color.White;
      break;
    default:
      throw new Error(`invalid sfen side to move: ${parts[1]}`);
  }
  if (parts[2] !== "-") {
    for (const m of parts[2].matchAll(/(\d*)([^\d])/g)) {
      const num = Number(m[1] || "1");
      const piece = SFEN_PIECE_MAP[m[2]];
      if (!piece) {
        throw new Error(`invalid sfen piece: ${m[2]}`);
      }
      const pt = piece.pieceType;
      if (
        pt !== PieceType.FU &&
        pt !== PieceType.KY &&
        pt !== PieceType.KE &&
        pt !== PieceType.GI &&
        pt !== PieceType.KI &&
        pt !== PieceType.KA &&
        pt !== PieceType.HI &&
        pt !== PieceType.OU
      ) {
        throw new Error(`invalid hand piece: ${m[2]}`);
      }
      switch (piece.color) {
        case Color.Black:
          hands[0][pt] += num;
          break;
        case Color.White:
          hands[1][pt] += num;
          break;
      }
    }
  }
  return [board, hands, sideToMove];
}

export function toSfen(
  board: Board,
  hands: [Hand, Hand],
  sideToMove: Color
): string {
  const parts = ["", "", "-", "1"];
  parts[0] = board
    .map((row: BoardPiece[]) => {
      let s = "";
      let emp = 0;
      for (let i = 0; i < 9; i++) {
        const p = row[i];
        if (p !== null) {
          if (emp > 0) {
            s += String(emp);
            emp = 0;
          }
          s += p2sfen(p);
        } else {
          emp++;
        }
      }
      if (emp > 0) {
        s += String(emp);
      }
      return s;
    })
    .join("/");
  switch (sideToMove) {
    case Color.Black:
      parts[1] = "b";
      break;
    case Color.White:
      parts[1] = "w";
      break;
  }
  if (hands.some((hand) => Object.values(hand).some((v) => v > 0))) {
    parts[2] = "";
    hands.forEach((hand: Hand, index: number) => {
      Array.from(HAND_KEYS)
        .reverse()
        .forEach((hpt: HandPieceType) => {
          const num = hand[hpt];
          if (num > 1) {
            parts[2] += String(num);
          }
          if (num > 0) {
            parts[2] += index === 0 ? pt2sfen(hpt).toUpperCase() : pt2sfen(hpt);
          }
        });
    });
  }
  // TODO: ply
  return parts.join(" ");
}
