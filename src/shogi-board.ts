import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ClassInfo, classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { Board, Square } from "./types";
import { pieceImage } from "./utils";

/**
 * This is Shogi Board element.
 */
@customElement("shogi-board")
export class ShogiBoard extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }
    table {
      width: 100%;
      border: solid 2px black;
      border-spacing: 0;
      background-color: #e5c316;
    }
    table tr td {
      border: solid 0.5px gray;
      padding: 0;
      width: 11%;
      position: relative;
    }
    table tr td.selected {
      background-color: gold;
    }
    table tr td::after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    .shogi-cell {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .shogi-cell svg {
      height: 100%;
      width: 100%;
    }
  `;

  @property({
    type: Array,
  })
  board: Board = Array(9).fill(Array(9).fill(null));
  @property({ type: Object }) select: Square | null = null;

  override render() {
    return html`<table>
      ${this.board.map((row, i) => {
        return html`<tr>
          ${row.map((col, j) => {
            const sq = new Square(i, j);
            const classes: ClassInfo = {
              selected:
                this.select !== null && this.select.equals(sq) ? true : false,
            };
            const styles = {
              cursor:
                this.select !== null || col !== null ? "pointer" : "inherit",
            };
            return html`<td
              class=${classMap(classes)}
              style=${styleMap(styles)}
            >
              <div
                class="shogi-cell"
                @click=${() => this.clickHandler(sq)}
                @dblclick=${() => this.dblclickHandler(sq)}
              >
                ${col !== null ? pieceImage(col) : nothing}
              </div>
            </td>`;
          })}
        </tr>`;
      })}
    </table>`;
  }

  private clickHandler(sq: Square) {
    this.dispatchEvent(new CustomEvent("cell-click", { detail: { sq } }));
  }
  private dblclickHandler(sq: Square) {
    const piece = this.board[sq.row][sq.col];
    if (piece !== null) {
      this.dispatchEvent(new CustomEvent("cell-dblclick", { detail: { sq } }));
    }
  }
}
