---
layout: example.11ty.cjs
title: <shogi-player> ⌲ Examples ⌲ Mode Property
tags: example
name: Mode Property
description: Setting the mode property
---

`<shogi-player>` can set the `mode` to `show` (default) or `edit`.

<style>
  div.player {
    width: 600px;
  }
</style>
<div class="player">
  <shogi-player mode="edit" title="Editable player"></shogi-player>
</div>

<h3>HTML</h3>

```html
<shogi-player mode="edit"></shogi-player>
```
