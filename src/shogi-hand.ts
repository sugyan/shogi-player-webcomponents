import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { choose } from "lit/directives/choose.js";
import { when } from "lit/directives/when.js";
import { Color, Hand, HandPieceType, Piece, PieceType } from "./types";
import { pieceImage } from "./utils";
import { HAND_KEYS } from "./constants";

/**
 * This is Shogi hand pieces element.
 */
@customElement("shogi-hand")
export class ShogiHand extends LitElement {
  static override styles = css`
    :host {
      font-size: small;
      width: 100%;
    }
    :host(.black) {
      align-self: flex-end;
    }
    :host(.white) {
      align-self: flex-start;
    }
    :host(.white) .side-to-move {
      transform: rotate(0.5turn);
      padding-left: 0.8em;
    }
    .side-to-move {
      text-align: center;
      font-size: x-large;
      cursor: pointer;
    }
    .hand-list {
      list-style: none;
      margin: 0;
    }
    :host(.black) .hand-list {
      padding-left: 0.8em;
      padding-right: 0.8em;
    }
    :host(.white) .hand-list {
      padding-left: 0em;
      padding-right: 1.6em;
    }
    .hand-piece {
      width: 100%;
      white-space: nowrap;
      cursor: pointer;
    }
    .hand-piece.selected {
      background-color: gold;
    }
    .hand-piece svg {
      height: 100%;
      width: 100%;
    }
  `;

  @property({ type: String }) color: Color = Color.Black;
  @property({ type: Object }) hand: Hand = {
    [PieceType.FU]: 0,
    [PieceType.KY]: 0,
    [PieceType.KE]: 0,
    [PieceType.GI]: 0,
    [PieceType.KI]: 0,
    [PieceType.KA]: 0,
    [PieceType.HI]: 0,
    [PieceType.OU]: 0,
  };
  @property({ type: Object }) select: Piece | null = null;

  override render() {
    const hands = HAND_KEYS.map((pt: HandPieceType) => {
      const num = this.hand[pt];
      return html`${when(num > 0, () => {
        const p = new Piece(this.color, pt);
        const classes = {
          "hand-piece": true,
          selected: this.select !== null && p.equals(this.select),
        };
        return html`<li
          class=${classMap(classes)}
          @click=${(e: MouseEvent) => this._clickHandler(e, pt)}
        >
          ${pieceImage(p)} ${when(num > 1, () => num)}
        </li>`;
      })} `;
    });
    return html`
      ${when(
        this.color === Color.Black,
        () => html`<div class="side-to-move">&#x2617;</div>`
      )}
      <ul class="hand-list black">
        ${choose(this.color, [
          [Color.Black, () => hands.reverse()],
          [Color.White, () => hands],
        ])}
      </ul>
      ${when(
        this.color === Color.White,
        () => html`<div class="side-to-move">&#x2616;</div>`
      )}
    `;
  }

  private _clickHandler(e: MouseEvent, pt: HandPieceType) {
    e.stopPropagation();
    const piece = new Piece(this.color, pt);
    this.dispatchEvent(new CustomEvent("hand-clicked", { detail: { piece } }));
  }
}
