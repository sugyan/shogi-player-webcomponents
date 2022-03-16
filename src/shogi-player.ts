/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ShogiBoard } from "./shogi-board";
import { BOARD_INIT, BOARD_NULL } from "./constants";
import { Board } from "./types";
import "./shogi-board";

/**
 * An element.
 *
 * @slot - This element has a slot
 */
@customElement("shogi-player")
export class ShogiPlayer extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
    }
  `;

  @state()
  private _board: Board = BOARD_INIT;

  /**
   * The title of shogi player
   */
  @property({ type: String })
  override title = "";

  override render() {
    return html`
      <div>${this.title}</div>
      <shogi-board .board=${this._board}></shogi-board>
      <button @click="${() => this.clearBoard()}">Clear Board</button>
      <slot></slot>
    `;
  }

  private clearBoard() {
    this._board = BOARD_NULL;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "shogi-player": ShogiPlayer;
    "shogi-board": ShogiBoard;
  }
}
