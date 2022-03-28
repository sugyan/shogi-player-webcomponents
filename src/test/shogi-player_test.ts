/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { ShogiPlayer } from "../shogi-player.js";

import { fixture, assert } from "@open-wc/testing";
import { html } from "lit/static-html.js";

suite("shogi-player", () => {
  test("is defined", () => {
    const el = document.createElement("shogi-player");
    assert.instanceOf(el, ShogiPlayer);
  });

  test("renders with default values", async () => {
    const el = await fixture(html`<shogi-player></shogi-player>`);
    assert.dom.equal(el.shadowRoot?.children[0], `<div></div>`);
  });
});
