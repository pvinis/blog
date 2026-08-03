---
title: TypeScript magic
date: 2023-03-01T00:00:00.000Z
tags: ["elsewhere"]
external: https://artsy.github.io/blog/2023/03/01/typescript-magic/
---

Back when I was at Artsy, I wrote a post for the engineering blog about a TypeScript trick I kept reaching for.

The short version: write `"hello" | "world" | string` and TypeScript collapses the whole thing down to `string`, so the autocomplete you wanted is gone. Write `"hello" | "world" | (string & {})` instead and the suggestions stick around, while the type still accepts any string at all.

We used it in `palette-mobile`, so a color prop would suggest `black100` and friends and still happily take `#000000`.
