import { Board, Color, Hand, Move, Piece, PieceType, Square } from "./types";
import { toSfen } from "./sfen";
import { pt2hpt } from "./utils";

export class Select {
  readonly sq: Square | null;
  readonly piece: Piece;
  constructor(sq: Square | null, piece: Piece) {
    this.sq = sq;
    this.piece = piece;
  }
}

export class Shogi {
  private _board: Board;
  private _hands: [Hand, Hand];
  private _color: Color;

  constructor(board: Board, hands: [Hand, Hand], color: Color) {
    this._board = board;
    this._hands = hands;
    this._color = color;
  }
  get board(): Board {
    return this._board.map((row) => row.slice());
  }
  get hands(): [Hand, Hand] {
    return [this.hand(Color.Black), this.hand(Color.White)];
  }
  get color(): Color {
    return this._color;
  }
  get sfen(): string {
    return toSfen(this.board, this.hands, this.color);
  }
  get legalMoves(): Move[] {
    const moves: Move[] = [];
    this.board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== null && col.color === this.color) {
          moves.push(...this.getMoves(new Square(i, j), col));
        }
      });
    });
    return moves;
  }
  hand(color: Color): Hand {
    switch (color) {
      case Color.Black:
        return { ...this._hands[0] };
      case Color.White:
        return { ...this._hands[1] };
    }
  }
  movePiece(src: Square | null, dst: Square | Color, select: Select): Shogi {
    if (dst instanceof Square) {
      const psrc = select.piece;
      const pdst = this.board[dst.row][dst.col];
      // move a piece on the board
      if (src !== null) {
        this._board[src.row][src.col] = null;
        this._board[dst.row][dst.col] = psrc;
        // captured?
        if (pdst) {
          if (psrc.color === Color.Black) {
            this._hands[0][pt2hpt(pdst.pieceType)] += 1;
          }
          if (psrc.color === Color.White) {
            this._hands[1][pt2hpt(pdst.pieceType)] += 1;
          }
        }
      }
      // drop a hand piece to the board
      else {
        this._board[dst.row][dst.col] = psrc;
        if (psrc.color === Color.Black) {
          this._hands[0][pt2hpt(psrc.pieceType)] -= 1;
          if (pdst !== null) {
            this._hands[0][pt2hpt(pdst.pieceType)] += 1;
          }
        }
        if (psrc.color === Color.White) {
          this._hands[1][pt2hpt(psrc.pieceType)] -= 1;
          if (pdst !== null) {
            this._hands[1][pt2hpt(pdst.pieceType)] += 1;
          }
        }
      }
    } else {
      const hpt = pt2hpt(select.piece.pieceType);
      // remove the piece from the board
      if (src !== null) {
        this._board[src.row][src.col] = null;
      }
      // move the hand pieces
      else if (select.piece.color !== dst) {
        switch (dst) {
          case Color.Black:
            this._hands[1][hpt]--;
            break;
          case Color.White:
            this._hands[0][hpt]--;
            break;
        }
      } else {
        // TODO
        return this;
      }
      switch (dst) {
        case Color.Black:
          this._hands[0][hpt]++;
          break;
        case Color.White:
          this._hands[1][hpt]++;
          break;
      }
    }
    return this;
  }
  private getMoves(sq: Square, piece: Piece): Move[] {
    const moves: Move[] = [];
    const directions: [[number, number][], [number, number][]] = [[], []];
    // prettier-ignore
    switch (piece.pieceType) {
      case PieceType.FU:
        directions[0] = [[-1, 0]];
        break;
      case PieceType.KY:
        directions[1] = [[-1, 0]];
        break;
      case PieceType.KE:
        directions[0] = [[-2, -1], [-2, 1]];
        break;
      case PieceType.GI:
        directions[0] = [[-1, -1], [-1,  0], [-1,  1], [ 1, -1], [ 1,  1]];
        break;
      case PieceType.TO:
        // fallthrough
      case PieceType.NY:
        // fallthrough
      case PieceType.NK:
        // fallthrough
      case PieceType.NG:
        // fallthrough
      case PieceType.KI:
        directions[0] = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1], [ 0,  1], [ 1,  0]];
        break;
      case PieceType.KA:
        directions[1] = [[-1, -1], [-1,  1], [ 1, -1], [ 1,  1]];
        break;
      case PieceType.HI:
        directions[1] = [[-1,  0], [ 0, -1], [ 0,  1], [ 1,  0]];
        break;
      case PieceType.OU:
        directions[0] = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1], [ 0,  1], [ 1, -1], [ 1,  0], [ 1,  1]];
        break;
      case PieceType.UM:
        directions[0] = [[-1,  0], [ 0, -1], [ 0,  1], [ 1,  0]];
        directions[1] = [[-1, -1], [-1,  1], [ 1, -1], [ 1,  1]];
        break;
      case PieceType.RY:
        directions[0] = [[-1, -1], [-1,  1], [ 1, -1], [ 1,  1]];
        directions[1] = [[-1,  0], [ 0, -1], [ 0,  1], [ 1,  0]];
        break;
    }
    directions[0].forEach((d) => {
      const [row, col] = [
        sq.row + d[0] * (piece.color === Color.Black ? 1 : -1),
        sq.col + d[1],
      ];
      if (0 <= row && row < 9 && 0 <= col && col < 9) {
        const p = this.board[row][col];
        if (p === null || p.color !== piece.color) {
          moves.push({
            from: sq,
            to: new Square(row, col),
            piece,
            promotion: false,
          });
        }
      }
    });
    directions[1].forEach((d) => {
      let [row, col] = [
        sq.row + d[0] * (piece.color === Color.Black ? 1 : -1),
        sq.col + d[1],
      ];
      while (0 <= row && row < 9 && 0 <= col && col < 9) {
        const p = this.board[row][col];
        if (p === null || p.color !== piece.color) {
          moves.push({
            from: sq,
            to: new Square(row, col),
            piece,
            promotion: false,
          });
        }
        if (p !== null) {
          break;
        }
        row += d[0] * (piece.color === Color.Black ? 1 : -1);
        col += d[1];
      }
    });
    return moves;
  }
}
