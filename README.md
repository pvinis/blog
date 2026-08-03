# Purple Royale

> Blog of Pavlos Vinieratos

[![ideas](https://img.shields.io/badge/ideas-what_to_write_next-db2777?style=flat-square&logo=markdown&logoColor=white)](IDEAS.md)

### 🔗 [pvin.is](https://pvin.is)

My personal blog.

## Running it

```bash
bun install
bun run dev
```

`bun run build` to build, `bun run preview` to serve the build, `bun run typecheck` for `tsc -b`.

## Writing a post

Drop a markdown file in [`src/posts/`](src/posts). The filename is the slug, so `my-games.md` is served at `/posts/my-games`.

```markdown
---
title: My Games
date: 2021-02-12T11:41:32.169Z
description: optional, shown under the title on the index
draft: true
faviconEmoji: "🎄"
external: https://somewhere.else/the-real-post
---

post body here
```

Only `title` and `date` are required. `draft: true` badges the post `[draft]` but still publishes it. Posts are sorted newest first and dates render in UTC.

`external` turns the entry into a link post, for something published on another site. The index links the title straight there with a `↗` and shows the host next to the date, while the date itself still links to the local page, which keeps your own blurb plus a pointer to the original. Feeds send readers to the other site too, but keep this site's url as the item id, so nothing looks like a repost. The canonical url stays ours, since a paragraph of context is not a duplicate of the article it points at.

There is no index to update. `src/posts.ts` picks up the folder with `import.meta.glob`, which vite resolves at build time.

#### Thank you for reading!
