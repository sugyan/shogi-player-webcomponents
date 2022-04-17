/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { ShogiBoard } from "./shogi-board";
import { Board, Color, Hand, Mode, Piece, Square } from "./types";
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
      min-width: 500px;
      display: block;
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
    [this.board, this.handBlack, this.handWhite, this.sideToMove] = parseSfen(
      this.sfen
    );
  }

  override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);
    if (name === "sfen" && value !== old && value !== null) {
      try {
        [this.board, this.handBlack, this.handWhite, this.sideToMove] =
          parseSfen(value);
        this.dispatchUpdateEvent();
      } catch (e) {
        console.error(e);
      }
    }
    if (name === "mode" && value !== old && value !== null) {
      switch (value) {
        case "show":
          this.mode = Mode.Show;
          break;
        case "edit":
          this.mode = Mode.Edit;
          break;
        case "play":
          this.mode = Mode.Play;
          break;
        default:
          throw new Error(`Unknown mode: ${value}`);
      }
    }
  }

  /**
   * The title of shogi player
   */
  @property({ type: String })
  override title = "";
  /**
   * The SFEN representation of initial position
   */
  @property({ type: String })
  sfen;
  /**
   * The mode of shogi player
   */
  @property({ type: String })
  mode: Mode = Mode.Show;

  @state()
  private board: Board;
  @state()
  private handBlack: Hand;
  @state()
  private handWhite: Hand;
  @state()
  private sideToMove: Color;
  @state()
  private select: Select | null = null;

  override render() {
    const cursorStyles = {
      cursor:
        this.mode === Mode.Edit && this.select !== null ? "pointer" : "default",
    };
    return html`
      <div>${this.title}</div>
      <div class="shogi-player" style=${styleMap(cursorStyles)}>
        <div
          class="shogi-hand"
          @click=${() => this.handAreaClickHandler(Color.White)}
        >
          <shogi-hand
            class="white"
            color=${Color.White}
            ?active=${this.sideToMove === Color.White}
            ?editable=${this.mode === Mode.Edit}
            .hand=${this.handWhite}
            .select=${this.select !== null && this.select.sq === null
              ? this.select.piece
              : null}
            @hand-piece-clicked=${this.handPieceClickHandler}
            @hand-color-clicked=${this.handColorClickHandler}
          ></shogi-hand>
        </div>
        <shogi-board
          .board=${this.board}
          .select=${this.select !== null ? this.select.sq : null}
          ?editable=${this.mode === Mode.Edit}
          @cell-click=${this.cellClickHandler}
          @cell-dblclick=${this.cellDblclickHandler}
        ></shogi-board>
        <div
          class="shogi-hand"
          @click=${() => this.handAreaClickHandler(Color.Black)}
        >
          <shogi-hand
            class="black"
            color=${Color.Black}
            ?active=${this.sideToMove === Color.Black}
            ?editable=${this.mode === Mode.Edit}
            .hand=${this.handBlack}
            .select=${this.select !== null && this.select.sq === null
              ? this.select.piece
              : null}
            @hand-piece-clicked=${this.handPieceClickHandler}
            @hand-color-clicked=${this.handColorClickHandler}
          ></shogi-hand>
        </div>
      </div>
    `;
  }
  private handAreaClickHandler(c: Color) {
    if (this.select !== null) {
      this.movePiece(this.select.sq, c);
      this.select = null;
    }
  }
  private cellClickHandler(e: CustomEvent<{ sq: Square }>) {
    if (this.select !== null) {
      if (this.select.sq === null || !this.select.sq.equals(e.detail.sq)) {
        this.movePiece(this.select.sq, e.detail.sq);
      }
      this.select = null;
    } else {
      // new selection
      const p = this.board[e.detail.sq.row][e.detail.sq.col];
      if (p !== null) {
        this.select = new Select(e.detail.sq, p);
      }
    }
  }
  private cellDblclickHandler(e: CustomEvent<{ sq: Square }>) {
    if (this.select === null) {
      this.movePiece(e.detail.sq, e.detail.sq);
    }
  }
  private handPieceClickHandler(e: CustomEvent<{ piece: Piece }>) {
    if (this.select !== null) {
      if (this.select.piece.equals(e.detail.piece)) {
        this.select = null;
      } else {
        this.select = new Select(null, e.detail.piece);
      }
    } else {
      this.select = new Select(null, e.detail.piece);
    }
  }
  private handColorClickHandler(e: CustomEvent<{ color: Color }>) {
    if (e.detail.color !== this.sideToMove) {
      this.sideToMove = e.detail.color;
      this.dispatchUpdateEvent();
    }
  }
  private movePiece(
    src: Square | null,
    dst: Square | Color,
    _promotion?: boolean
  ) {
    if (this.select === null) {
      if (!(dst instanceof Square && src !== null && src.equals(dst))) {
        return;
      }
      // double click
      const board = this.board.map((row) => row.slice());
      const piece = board[src.row][src.col];
      if (piece !== null) {
        board[src.row][src.col] = nextPiece(piece);
      }
      this.board = board;
    } else {
      if (dst instanceof Square) {
        const board = this.board.map((row) => row.slice());
        const psrc = this.select.piece;
        const pdst = board[dst.row][dst.col];
        // move the piece on the board
        if (src !== null) {
          board[src.row][src.col] = null;
          board[dst.row][dst.col] = psrc;
          // captured?
          if (pdst) {
            if (psrc.color === Color.Black) {
              const hand = { ...this.handBlack };
              hand[pt2hpt(pdst.pieceType)] += 1;
              this.handBlack = hand;
            }
            if (psrc.color === Color.White) {
              const hand = { ...this.handWhite };
              hand[pt2hpt(pdst.pieceType)] += 1;
              this.handWhite = hand;
            }
          }
        }
        // drop the piece to the board
        else {
          board[dst.row][dst.col] = psrc;
          if (psrc.color === Color.Black) {
            const hand = { ...this.handBlack };
            hand[pt2hpt(psrc.pieceType)] -= 1;
            if (pdst !== null) {
              hand[pt2hpt(pdst.pieceType)] += 1;
            }
            this.handBlack = hand;
          }
          if (psrc.color === Color.White) {
            const hand = { ...this.handWhite };
            hand[pt2hpt(psrc.pieceType)] -= 1;
            if (pdst !== null) {
              hand[pt2hpt(pdst.pieceType)] += 1;
            }
            this.handWhite = hand;
          }
        }
        this.board = board;
      } else {
        const piece = this.select.piece;
        const hpt = pt2hpt(piece.pieceType);
        // remove the piece from the board
        if (src !== null) {
          const board = this.board.map((row) => row.slice());
          board[src.row][src.col] = null;
          this.board = board;
        }
        // move the hand pieces
        else if (piece.color !== dst) {
          switch (dst) {
            case Color.Black:
              this.handWhite = {
                ...this.handWhite,
                [hpt]: this.handWhite[hpt] - 1,
              };
              break;
            case Color.White:
              this.handBlack = {
                ...this.handBlack,
                [hpt]: this.handBlack[hpt] - 1,
              };
              break;
          }
        } else {
          return;
        }
        switch (dst) {
          case Color.Black:
            this.handBlack = {
              ...this.handBlack,
              [hpt]: this.handBlack[hpt] + 1,
            };
            break;
          case Color.White:
            this.handWhite = {
              ...this.handWhite,
              [hpt]: this.handWhite[hpt] + 1,
            };
            break;
        }
      }
    }
    this.dispatchUpdateEvent();
  }
  private dispatchUpdateEvent() {
    this.dispatchEvent(
      new CustomEvent<UpdateEventDetail>("update", {
        detail: {
          sfen: toSfen(
            this.board,
            this.handBlack,
            this.handWhite,
            this.sideToMove
          ),
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
