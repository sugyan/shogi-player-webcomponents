/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { ShogiBoard } from "./shogi-board";
import { Board, Color, Hand, Piece, Square } from "./types";
import { nextPiece, pt2hpt } from "./utils";
import { parseSfen, toSfen } from "./sfen";
import "./shogi-board";
import "./shogi-hand";

interface UpdateEventDetail {
  sfen: string;
}

class Select {
  readonly sq: Square | null;
  readonly piece: Piece;
  constructor(sq: Square | null, piece: Piece) {
    this.sq = sq;
    this.piece = piece;
  }
}

/**
 * A Shogi Player element.
 */
@customElement("shogi-player")
export class ShogiPlayer extends LitElement {
  static override styles = css`
    :host {
      width: 600px;
      display: block;
      border: solid 1px gray;
      padding: 16px;
      font-family: sans-serif;
    }
    .shogi-player {
      display: flex;
      justify-content: center;
      margin: 16px 0;
    }
    .shogi-hand {
      width: 12.5%;
      display: flex;
    }
  `;

  constructor() {
    super();
    this.sfen =
      "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1";
    [this._board, this._hand_black, this._hand_white] = parseSfen(this.sfen);
  }

  override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    if (name === "sfen" && value !== old && value !== null) {
      try {
        [this._board, this._hand_black, this._hand_white] = parseSfen(value);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * The title of shogi player
   */
  @property({ type: String, attribute: false })
  override title = "";
  /**
   * The SFEN representation of initial position
   */
  @property({ type: String, attribute: true })
  sfen;

  @state()
  private _board: Board;
  @state()
  private _hand_black: Hand;
  @state()
  private _hand_white: Hand;
  @state()
  private _select: Select | null = null;

  override render() {
    const cursorStyles = {
      cursor: this._select !== null ? "pointer" : "default",
    };
    return html`
      <div>${this.title}</div>
      <div class="shogi-player" style=${styleMap(cursorStyles)}>
        <div
          class="shogi-hand"
          @click=${() => this._handAreaClickHandler(Color.White)}
        >
          <shogi-hand
            class="white"
            color=${Color.White}
            .hand=${this._hand_white}
            .select=${this._select !== null && this._select.sq === null
              ? this._select.piece
              : null}
            @hand-clicked=${this._handPieceClickHandler}
          ></shogi-hand>
        </div>
        <shogi-board
          @cell-click=${this._cellClickHandler}
          @cell-dblclick=${this._cellDblclickHandler}
          .board=${this._board}
          .select=${this._select !== null ? this._select.sq : null}
        ></shogi-board>
        <div
          class="shogi-hand"
          @click=${() => this._handAreaClickHandler(Color.Black)}
        >
          <shogi-hand
            class="black"
            color=${Color.Black}
            .hand=${this._hand_black}
            .select=${this._select !== null && this._select.sq === null
              ? this._select.piece
              : null}
            @hand-clicked=${this._handPieceClickHandler}
          ></shogi-hand>
        </div>
      </div>
    `;
  }
  private _handAreaClickHandler(c: Color) {
    if (this._select !== null) {
      this.movePiece(this._select.sq, c);
      this._select = null;
    }
  }
  private _cellClickHandler(e: CustomEvent<{ sq: Square }>) {
    if (this._select !== null) {
      if (this._select.sq === null || !this._select.sq.equals(e.detail.sq)) {
        this.movePiece(this._select.sq, e.detail.sq);
      }
      this._select = null;
    } else {
      // new selection
      const p = this._board[e.detail.sq.row][e.detail.sq.col];
      if (p !== null) {
        this._select = new Select(e.detail.sq, p);
      }
    }
  }
  private _cellDblclickHandler(e: CustomEvent<{ sq: Square }>) {
    if (this._select === null) {
      this.movePiece(e.detail.sq, e.detail.sq);
    }
  }
  private _handPieceClickHandler(e: CustomEvent<{ piece: Piece }>) {
    if (this._select !== null) {
      if (this._select.piece.equals(e.detail.piece)) {
        this._select = null;
      } else {
        this._select = new Select(null, e.detail.piece);
      }
    } else {
      this._select = new Select(null, e.detail.piece);
    }
  }
  private movePiece(
    src: Square | null,
    dst: Square | Color,
    _promotion?: boolean
  ) {
    if (this._select === null) {
      if (!(dst instanceof Square && src !== null && src.equals(dst))) {
        return;
      }
      // double click
      const board = this._board.map((row) => row.slice());
      const piece = board[src.row][src.col];
      if (piece !== null) {
        board[src.row][src.col] = nextPiece(piece);
      }
      this._board = board;
    } else {
      if (dst instanceof Square) {
        const board = this._board.map((row) => row.slice());
        const psrc = this._select.piece;
        const pdst = board[dst.row][dst.col];
        // move the piece on the board
        if (src !== null) {
          board[src.row][src.col] = null;
          board[dst.row][dst.col] = psrc;
          // captured?
          if (pdst) {
            if (psrc.color === Color.Black) {
              const hand = { ...this._hand_black };
              hand[pt2hpt(pdst.pieceType)] += 1;
              this._hand_black = hand;
            }
            if (psrc.color === Color.White) {
              const hand = { ...this._hand_white };
              hand[pt2hpt(pdst.pieceType)] += 1;
              this._hand_white = hand;
            }
          }
        }
        // drop the piece to the board
        else {
          board[dst.row][dst.col] = psrc;
          if (psrc.color === Color.Black) {
            const hand = { ...this._hand_black };
            hand[pt2hpt(psrc.pieceType)] -= 1;
            if (pdst !== null) {
              hand[pt2hpt(pdst.pieceType)] += 1;
            }
            this._hand_black = hand;
          }
          if (psrc.color === Color.White) {
            const hand = { ...this._hand_white };
            hand[pt2hpt(psrc.pieceType)] -= 1;
            if (pdst !== null) {
              hand[pt2hpt(pdst.pieceType)] += 1;
            }
            this._hand_white = hand;
          }
        }
        this._board = board;
      } else {
        const piece = this._select.piece;
        const hpt = pt2hpt(piece.pieceType);
        switch (dst) {
          case Color.Black:
            this._hand_black = {
              ...this._hand_black,
              [hpt]: this._hand_black[hpt] + 1,
            };
            break;
          case Color.White:
            this._hand_white = {
              ...this._hand_white,
              [hpt]: this._hand_white[hpt] + 1,
            };
            break;
        }
        // remove the piece from the board
        if (src !== null) {
          const board = this._board.map((row) => row.slice());
          board[src.row][src.col] = null;
          this._board = board;
        }
        // move the hand pieces
        else if (piece.color !== dst) {
          switch (dst) {
            case Color.Black:
              this._hand_white = {
                ...this._hand_white,
                [hpt]: this._hand_white[hpt] - 1,
              };
              break;
            case Color.White:
              this._hand_black = {
                ...this._hand_black,
                [hpt]: this._hand_black[hpt] - 1,
              };
              break;
          }
        }
      }
    }
    this.dispatchEvent(
      new CustomEvent<UpdateEventDetail>("update", {
        detail: {
          sfen: toSfen(this._board, this._hand_black, this._hand_white),
        },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "shogi-player": ShogiPlayer;
    "shogi-board": ShogiBoard;
  }
}
