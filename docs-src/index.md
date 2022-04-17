---
layout: page.11ty.cjs
title: <shogi-player> ⌲ Home
---

# &lt;shogi-player>

`<shogi-player>` is a web component made with LitElement.
It can represent the shogi board and hand pieces and also edit them.

## As easy as HTML

<section class="columns">
  <div>

`<shogi-player>` is just an HTML element. You can it anywhere you can use HTML!

```html
<shogi-player></shogi-player>
```

  </div>
  <div>

<shogi-player></shogi-player>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<shogi-player>` can be configured with attributed in plain HTML.

```html
<shogi-player title="Title"></shogi-player>
```

  </div>
  <div>

<shogi-player title="Title"></shogi-player>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<shogi-player>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const title = 'lit-html';

render(
  html`
    <h2>This is a &lt;shogi-player&gt;</h2>
    <shogi-player .title=${title}></shogi-player>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;shogi-player&gt;</h2>
<shogi-player title="lit-html"></shogi-player>

  </div>
</section>
