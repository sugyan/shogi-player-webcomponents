import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
      padding: 10px 0;
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

  @property({ type: Array, attribute: true }) board: Board = BOARD_NULL;

  @state() private _selected: Square | null = null;

  override render() {
    return html`<table>
      ${this.board.map((row: BoardRow, i: number) => {
        return html`<tr>
          ${row.map((col: BoardCol, j: number) => {
            const sq = rc2sq(i, j);
            const styles = {
              cursor:
                this._selected !== null || col !== null ? "pointer" : "default",
              backgroundColor: this.isSelected(sq) ? "gold" : "",
            };
            return html`<td style=${styleMap(styles)}>
              <div
                class="shogi-cell"
                @click=${() => this.cellClicked(sq)}
                @dblclick=${() => this.cellDoubleClicked(sq)}
              >
                ${pieceImage(col)}
              </div>
            </td>`;
          })}
        </tr>`;
      })}
    </table>`;
  }

  private cellClicked(sq: Square) {
    const [row, col] = sq2rc(sq);
    if (this._selected !== null) {
      if (this.isSelected(sq)) {
        this._selected = null;
      } else {
        const [selrow, selcol] = sq2rc(this._selected);
        const piece = this.board[selrow][selcol];
        this.board[selrow][selcol] = null;
        this.board[row][col] = piece;
        this._selected = null;
        this.requestUpdate("board");
      }
    } else {
      if (this.board[row][col] !== null) {
        this._selected = sq;
      }
    }
  }
  private cellDoubleClicked(sq: Square) {
    const [row, col] = sq2rc(sq);
    const piece = this.board[row][col];
    if (piece !== null) {
      this.board[row][col] = nextPiece(piece);
      this.requestUpdate("board");
    }
  }
  private isSelected(sq: Square): boolean {
    return (
      this._selected !== null &&
      this._selected.file === sq.file &&
      this._selected.rank === sq.rank
    );
  }
}
