---
layout: example.11ty.cjs
title: <shogi-player> ⌲ Examples ⌲ Update Event
tags: example
name: Update Event
description: Listening update event
---

<style>
  div.player {
    width: 600px;
  }
  pre {
    font-size: smaller;
    padding: 0.5em;
    background-color: lightgray;
    overflow-x: scroll;
  }
</style>
<div class="player">
  <shogi-player id="player"></shogi-player>
  <pre id="sfen">lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1</pre>
</div>
<script>
  document.getElementById("player").addEventListener("update", (e) => {
    document.getElementById("sfen").innerText = e.detail.sfen;
  });
</script>

```html
<div class="player">
  <shogi-player id="player"></shogi-player>
  <pre id="sfen">lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1</pre>
</div>
<script>
  document.getElementById("player").addEventListener("update", (e) => {
    document.getElementById("sfen").innerText = e.detail.sfen;
  });
</script>
```