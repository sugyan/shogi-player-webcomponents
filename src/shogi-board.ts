import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Board } from "./types";

/**
 * This is Shogi Board element.
 */
@customElement("shogi-board")
export class ShogiBoard extends LitElement {
  protected constructor() {
    super();
    this.board = [
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

  @property({ type: Array, attribute: true }) board: Board;

  override render() {
    return html`<table>
      ${this.board.map((row, i) => {
        return html`<tr>
          ${row.map((col, j) => {
            return html`<td>${9 - j} ${i + 1}: ${col}</td>`;
          })}
        </tr>`;
      })}
    </table>`;
  }
}
