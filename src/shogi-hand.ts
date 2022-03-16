import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import { when } from "lit/directives/when.js";
import { Color, PieceType, Piece, HandPieceType, Hand } from "./types";
import { HAND_KEYS, HAND_ZERO } from "./constants";
import { pieceImage } from "./utils";

/**
 * This is Shogi hand pieces element.
 */
@customElement("shogi-hand")
export class ShogiHand extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      width: 12.5%;
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
      margin: 15% 0;
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
    }
    .hand-piece svg {
      height: 100%;
      width: 100%;
    }
  `;
  @property({ type: String }) color: Color = Color.None;
  @property({ type: Object }) hand: Hand = HAND_ZERO;

  override render() {
    const hands = HAND_KEYS.map((pt: HandPieceType) => {
      const num = this.hand[pt];
      return html`<li class="hand-piece">
        ${when(num > 0, () => {
          return html`${pieceImage(this.piece(pt))} ${when(num > 1, () => num)}`;
        })}
      </li>`;
    });
    return html`<ul class="hand-list black">
      ${choose(this.color, [
        [Color.Black, () => hands.reverse()],
        [Color.White, () => hands],
      ])}
    </ul> `;
  }

  private piece(pt: PieceType): Piece {
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
    }
    throw new Error("invalid piece type");
  }
}
