import { Color, Piece, PieceType, HandPieceType } from "./types";
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

export function pt2hpt(pt: PieceType): HandPieceType {
  switch (pt) {
    case PieceType.FU:
    case PieceType.TO:
      return PieceType.FU;
    case PieceType.KY:
    case PieceType.NY:
      return PieceType.KY;
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
  const c = piece.color;
  const opp = {
    [Color.Black]: Color.White,
    [Color.White]: Color.Black,
  }[c];
  switch (piece.pieceType) {
    case PieceType.FU:
      return new Piece(c, PieceType.TO);
    case PieceType.KY:
      return new Piece(c, PieceType.NY);
    case PieceType.KE:
      return new Piece(c, PieceType.NK);
    case PieceType.GI:
      return new Piece(c, PieceType.NG);
    case PieceType.KI:
      return new Piece(opp, PieceType.KI);
    case PieceType.KA:
      return new Piece(c, PieceType.UM);
    case PieceType.HI:
      return new Piece(c, PieceType.RY);
    case PieceType.OU:
      return new Piece(opp, PieceType.OU);
    case PieceType.TO:
      return new Piece(opp, PieceType.FU);
    case PieceType.NY:
      return new Piece(opp, PieceType.KY);
    case PieceType.NK:
      return new Piece(opp, PieceType.KE);
    case PieceType.NG:
      return new Piece(opp, PieceType.GI);
    case PieceType.UM:
      return new Piece(opp, PieceType.KA);
    case PieceType.RY:
      return new Piece(opp, PieceType.HI);
  }
}

export function pieceImage(piece: Piece) {
  switch (piece.color) {
    case Color.Black:
      switch (piece.pieceType) {
        case PieceType.FU:
          return bfu;
        case PieceType.KY:
          return bky;
        case PieceType.KE:
          return bke;
        case PieceType.GI:
          return bgi;
        case PieceType.KI:
          return bki;
        case PieceType.KA:
          return bka;
        case PieceType.HI:
          return bhi;
        case PieceType.OU:
          return bou;
        case PieceType.TO:
          return bto;
        case PieceType.NY:
          return bny;
        case PieceType.NK:
          return bnk;
        case PieceType.NG:
          return bng;
        case PieceType.UM:
          return bum;
        case PieceType.RY:
          return bry;
      }
      break;
    case Color.White:
      switch (piece.pieceType) {
        case PieceType.FU:
          return wfu;
        case PieceType.KY:
          return wky;
        case PieceType.KE:
          return wke;
        case PieceType.GI:
          return wgi;
        case PieceType.KI:
          return wki;
        case PieceType.KA:
          return wka;
        case PieceType.HI:
          return whi;
        case PieceType.OU:
          return wou;
        case PieceType.TO:
          return wto;
        case PieceType.NY:
          return wny;
        case PieceType.NK:
          return wnk;
        case PieceType.NG:
          return wng;
        case PieceType.UM:
          return wum;
        case PieceType.RY:
          return wry;
      }
      break;
  }
}
