import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { BOARD_NULL } from "./constants";
import { Board, BoardCol, BoardRow, Square } from "./types";
import { rc2sq, sq2rc, nextPiece, pieceImage } from "./utils";

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

  @property({ type: Array }) board: Board = BOARD_NULL;
  @property({ type: Object }) selected: Square | null = null;

  override render() {
    return html`<table>
      ${this.board.map((row: BoardRow, i: number) => {
        return html`<tr>
          ${row.map((col: BoardCol, j: number) => {
            const sq = rc2sq(i, j);
            const styles = {
              cursor:
                this.selected !== null || col !== null ? "pointer" : "default",
              backgroundColor: this.isSelected(sq) ? "gold" : "",
            };
            return html`<td style=${styleMap(styles)}>
              <div
                class="shogi-cell"
                @click=${() => this._clickHandler(sq)}
                @dblclick=${() => this._dblclickHandler(sq)}
              >
                ${pieceImage(col)}
              </div>
            </td>`;
          })}
        </tr>`;
      })}
    </table>`;
  }

  private _clickHandler(sq: Square) {
    const [row, col] = sq2rc(sq);
    const piece = this.board[row][col];
    if (this.selected !== null || piece !== null) {
      this.dispatchEvent(
        new CustomEvent("cell-clicked", { detail: { sq, piece } })
      );
    }
  }
  private _dblclickHandler(sq: Square) {
    const [row, col] = sq2rc(sq);
    const piece = this.board[row][col];
    if (piece !== null) {
      this.board[row][col] = nextPiece(piece);
      this.requestUpdate("board");
    }
  }
  private isSelected(sq: Square): boolean {
    return this.selected !== null && this.selected.equals(sq);
  }
}
