import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { choose } from "lit/directives/choose.js";
import { when } from "lit/directives/when.js";
import { Color, PieceType, Piece, HandPieceType, Hand } from "./types";
import { pieceImage } from "./utils";
import { HAND_KEYS, HAND_ZERO } from "./constants";

/**
 * This is Shogi hand pieces element.
 */
@customElement("shogi-hand")
export class ShogiHand extends LitElement {
  static override styles = css`
    :host {
      font-size: small;
    }
    :host(.black) {
      align-self: flex-end;
    }
    :host(.white) {
      align-self: flex-start;
    }
    .hand-list {
      list-style: none;
      margin: 0;
      padding-left: 0;
    }
    :host(.black) .hand-list {
      padding-left: 0.8em;
      padding-right: 0.8em;
    }
    :host(.white) .hand-list {
      padding-right: 1.6em;
    }
    .hand-piece {
      width: 100%;
      white-space: nowrap;
      cursor: pointer;
    }
    .hand-piece svg {
      height: 100%;
      width: 100%;
    }
  `;
  @property({ type: String }) color: Color = Color.None;
  @property({ type: Object }) hand: Hand = HAND_ZERO;
  @property({ type: String }) selected: Piece | null = null;

  override render() {
    const hands = HAND_KEYS.map((pt: HandPieceType) => {
      const num = this.hand[pt];
      return html`${when(num > 0, () => {
        const p = this.piece(pt);
        const styles = {
          backgroundColor: p === this.selected ? "gold" : "",
        };
        return html`<li
          class="hand-piece"
          style=${styleMap(styles)}
          @click=${() => this._clickHandler(pt)}
        >
          ${pieceImage(p)} ${when(num > 1, () => num)}
        </li>`;
      })} `;
    });
    return html`<ul class="hand-list black">
      ${choose(this.color, [
        [Color.Black, () => hands.reverse()],
        [Color.White, () => hands],
      ])}
    </ul> `;
  }

  private _clickHandler(pt: HandPieceType) {
    const piece = this.piece(pt);
    this.dispatchEvent(new CustomEvent("hand-clicked", { detail: { piece } }));
  }
  private piece(pt: HandPieceType): Piece {
    switch (this.color) {
      case Color.Black:
        switch (pt) {
          case PieceType.FU:
            return Piece.BFU;
          case PieceType.KY:
            return Piece.BKY;
          case PieceType.KE:
            return Piece.BKE;
          case PieceType.GI:
            return Piece.BGI;
          case PieceType.KI:
            return Piece.BKI;
          case PieceType.KA:
            return Piece.BKA;
          case PieceType.HI:
            return Piece.BHI;
          case PieceType.OU:
            return Piece.BOU;
        }
        break;
      case Color.White:
        switch (pt) {
          case PieceType.FU:
            return Piece.WFU;
          case PieceType.KY:
            return Piece.WKY;
          case PieceType.KE:
            return Piece.WKE;
          case PieceType.GI:
            return Piece.WGI;
          case PieceType.KI:
            return Piece.WKI;
          case PieceType.KA:
            return Piece.WKA;
          case PieceType.HI:
            return Piece.WHI;
          case PieceType.OU:
            return Piece.WOU;
        }
        break;
      default:
        throw new Error("invalid piece type");
    }
  }
}
