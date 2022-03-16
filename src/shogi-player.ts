/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ShogiBoard } from "../shogi-board";
import { Board, Piece } from "./types";
import "./shogi-board";

/**
 * An element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("shogi-player")
export class ShogiPlayer extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  private constructor() {
    super();
    // prettier-ignore
    this._board = [
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
  }

  @state()
  private _board: Board;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = "Shogi Player";

  override render() {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      <shogi-board .board=${this._board}></shogi-board>
      <button @click="${() => this.clearBoard()}">Clear Board</button>
      <slot></slot>
    `;
  }

  private clearBoard() {
    this._board = [
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
  }

  /**
   * Formats a greeting
   * @param name The name to say "Hello" to
   */
  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "shogi-player": ShogiPlayer;
    "shogi-board": ShogiBoard;
  }
}
