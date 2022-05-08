/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { ShogiBoard } from "./shogi-board";
import { ShogiHand } from "./shogi-hand";
import { Color, Mode, Move, Piece, Square } from "./types";
import { parseSfen } from "./sfen";
import { nextPiece } from "./utils";
import { Select, Shogi } from "./shogi";
import "./shogi-board";
import "./shogi-hand";

interface UpdateEventDetail {
  sfen: string;
}

/**
 * A Shogi Player element.
 */
@customElement("shogi-player")
export class ShogiPlayer extends LitElement {
  static override styles = css`
    :host {
      min-width: 320px;
      display: block;
      padding: 16px;
      font-family: sans-serif;
      touch-action: manipulation;
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
    this.shogi = new Shogi(...parseSfen(this.sfen));
  }

  override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);
    if (value !== old && value !== null) {
      switch (name) {
        case "sfen":
          this.shogi = new Shogi(...parseSfen(this.sfen));
          this.dispatchUpdateEvent();
          break;
        case "mode":
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
          break;
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
  private select: Select | null = null;

  @state()
  private shogi: Shogi;

  override render() {
    const selectables = new Set(this.shogi.legalMoves.map((m: Move) => m.from));
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
            ?active=${this.shogi.color === Color.White}
            ?editable=${this.mode === Mode.Edit}
            .hand=${this.shogi.hand(Color.White)}
            .select=${this.select !== null && this.select.sq === null
              ? this.select.piece
              : null}
            @hand-piece-clicked=${this.handPieceClickHandler}
            @hand-color-clicked=${this.handColorClickHandler}
          ></shogi-hand>
        </div>
        <shogi-board
          .board=${this.shogi.board}
          .select=${this.select !== null ? this.select.sq : null}
          .selectables=${selectables}
          ?editable=${this.mode === Mode.Edit}
          @cell-click=${this.cellClickHandler}
        ></shogi-board>
        <div
          class="shogi-hand"
          @click=${() => this.handAreaClickHandler(Color.Black)}
        >
          <shogi-hand
            class="black"
            color=${Color.Black}
            ?active=${this.shogi.color === Color.Black}
            ?editable=${this.mode === Mode.Edit}
            .hand=${this.shogi.hand(Color.Black)}
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
      // change to next piece (Edit mode only)
      if (
        this.select.sq !== null &&
        this.select.sq.equals(e.detail.sq) &&
        this.mode === Mode.Edit
      ) {
        const sq = this.select.sq;
        const board = this.shogi.board;
        board[sq.row][sq.col] = nextPiece(this.select.piece);
        this.shogi = new Shogi(board, this.shogi.hands, this.shogi.color);
        this.dispatchUpdateEvent();
      }
      // move piece
      else {
        this.movePiece(this.select.sq, e.detail.sq);
      }
      this.select = null;
    } else {
      // new selection
      const p = this.shogi.board[e.detail.sq.row][e.detail.sq.col];
      if (p !== null) {
        this.select = new Select(e.detail.sq, p);
      }
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
    if (e.detail.color !== this.shogi.color) {
      this.shogi = new Shogi(
        this.shogi.board,
        this.shogi.hands,
        e.detail.color
      );
      this.dispatchUpdateEvent();
    }
  }
  private movePiece(src: Square | null, dst: Square | Color) {
    if (this.select !== null) {
      this.shogi = this.shogi.movePiece(src, dst, this.select);
      this.dispatchUpdateEvent();
    }
  }
  private dispatchUpdateEvent() {
    this.dispatchEvent(
      new CustomEvent<UpdateEventDetail>("update", {
        detail: {
          sfen: this.shogi.sfen,
        },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "shogi-player": ShogiPlayer;
    "shogi-board": ShogiBoard;
    "shogi-hand": ShogiHand;
  }
}
