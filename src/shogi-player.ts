/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ShogiBoard } from "./shogi-board";
import { BOARD_INIT, BOARD_NULL, HAND_ZERO, HAND_ALL } from "./constants";
import { Color, Board, Hand } from "./types";
import "./shogi-board";
import "./shogi-hand";

/**
 * An element.
 *
 * @slot - This element has a slot
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
      align-items: center;
    }
  `;

  @state()
  private _board: Board = BOARD_INIT;
  @state()
  private _hand_black: Hand = HAND_ZERO;
  @state()
  private _hand_white: Hand = HAND_ZERO;

  /**
   * The title of shogi player
   */
  @property({ type: String })
  override title = "";

  override render() {
    return html`
      <div>${this.title}</div>
      <div class="shogi-player">
        <shogi-hand
          class="white"
          color=${Color.White}
          .hand=${this._hand_white}
        ></shogi-hand>
        <shogi-board .board=${this._board}></shogi-board>
        <shogi-hand
          class="black"
          color=${Color.Black}
          .hand=${this._hand_black}
        ></shogi-hand>
      </div>
      <button @click="${() => this.clearBoard()}">Clear Board</button>
      <slot></slot>
    `;
  }

  private clearBoard() {
    this._board = BOARD_NULL;
    this._hand_black = HAND_ALL;
    this._hand_white = HAND_ALL;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "shogi-player": ShogiPlayer;
    "shogi-board": ShogiBoard;
  }
}
