/**
 * Turns the SPA build into real static html, one file per route, plus a sitemap
 * and feeds.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * Without this every url served the same empty shell, which meant every post
 * claimed rel=canonical of the home page and no crawler could read a word of
 * the content.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { allPosts, posts, render, renderMarkdown, site } from "../dist-ssr/entry-server.js"
import type { Post } from "../src/posts"

// fileURLToPath rather than import.meta.dir, so this runs under node too and is
// not tied to whichever runtime vercel picks.
const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist")

const template = await readFile(join(DIST, "index.html"), "utf8")

async function writeFileAt(relativePath: string, contents: string) {
	const target = join(DIST, relativePath)
	await mkdir(dirname(target), { recursive: true })
	await writeFile(target, contents, "utf8")
}

/** render a route through the app and drop it into the built html shell. */
async function prerender(url: string, outPath: string) {
	const { html, head } = render(url)

	const page = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html)

	await writeFileAt(outPath, page)
	return page
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
}

/** ]]> would close the section early, so split it across two sections. */
function cdata(value: string): string {
	return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`
}

const url = (path: string) => `${site.url}${path}`
const postUrl = (post: Post) => url(`/posts/${post.slug}`)
const summary = (post: Post) => post.attributes.description ?? `Post: ${post.attributes.title}`

// ---------------------------------------------------------------- pages

// every post gets a file, drafts included, so their urls keep working. drafts
// carry noindex from the Seo component and are left out of the sitemap and
// feeds below.
const routes = [
	{ url: "/", out: "index.html" },
	...allPosts.map((post: Post) => ({ url: `/posts/${post.slug}`, out: `posts/${post.slug}.html` })),
]

for (const route of routes) {
	await prerender(route.url, route.out)
}

// a path that matches nothing renders the 404 page. vercel serves this with a
// real 404 status, instead of the 200 that the old catch-all rewrite gave every
// made up url.
await prerender("/__not_found__", "404.html")

// ---------------------------------------------------------------- sitemap

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${escapeXml(site.url)}</loc>
		<changefreq>weekly</changefreq>
	</url>
${posts
	.map(
		(post: Post) => `	<url>
		<loc>${escapeXml(postUrl(post))}</loc>
		<lastmod>${post.date.toISOString()}</lastmod>
	</url>`,
	)
	.join("\n")}
</urlset>
`

await writeFileAt("sitemap.xml", sitemap)

// ---------------------------------------------------------------- feeds

const updated = posts[0]?.date ?? new Date(0)
const entries = posts.map((post: Post) => ({ post, html: renderMarkdown(post.body) }))

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(site.name)}</title>
		<link>${escapeXml(site.url)}</link>
		<description>${escapeXml(site.description)}</description>
		<language>${site.language}</language>
		<lastBuildDate>${updated.toUTCString()}</lastBuildDate>
		<atom:link href="${escapeXml(url("/feed/feed.xml"))}" rel="self" type="application/rss+xml" />
${entries
	.map(
		({ post, html }) => `		<item>
			<title>${escapeXml(post.attributes.title)}</title>
			<link>${escapeXml(postUrl(post))}</link>
			<guid isPermaLink="true">${escapeXml(postUrl(post))}</guid>
			<pubDate>${post.date.toUTCString()}</pubDate>
			<description>${escapeXml(summary(post))}</description>
			<content:encoded xmlns:content="http://purl.org/rss/1.0/modules/content/">${cdata(html)}</content:encoded>
		</item>`,
	)
	.join("\n")}
	</channel>
</rss>
`

const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>${escapeXml(site.name)}</title>
	<subtitle>${escapeXml(site.description)}</subtitle>
	<id>${escapeXml(site.url)}</id>
	<link href="${escapeXml(site.url)}" />
	<link href="${escapeXml(url("/feed/atom.xml"))}" rel="self" type="application/atom+xml" />
	<updated>${updated.toISOString()}</updated>
	<author>
		<name>${escapeXml(site.author.name)}</name>
	</author>
${entries
	.map(
		({ post, html }) => `	<entry>
		<title>${escapeXml(post.attributes.title)}</title>
		<id>${escapeXml(postUrl(post))}</id>
		<link href="${escapeXml(postUrl(post))}" />
		<updated>${post.date.toISOString()}</updated>
		<published>${post.date.toISOString()}</published>
		<summary>${escapeXml(summary(post))}</summary>
		<content type="html">${cdata(html)}</content>
	</entry>`,
	)
	.join("\n")}
</feed>
`

const jsonFeed = {
	version: "https://jsonfeed.org/version/1.1",
	title: site.name,
	home_page_url: site.url,
	feed_url: url("/feed/feed.json"),
	description: site.description,
	language: site.language,
	authors: [{ name: site.author.name, url: `https://github.com/${site.social.github}` }],
	items: entries.map(({ post, html }) => ({
		id: postUrl(post),
		url: postUrl(post),
		title: post.attributes.title,
		summary: summary(post),
		content_html: html,
		date_published: post.date.toISOString(),
		tags: post.attributes.tags,
	})),
}

await writeFileAt("feed/feed.xml", rss)
await writeFileAt("feed/atom.xml", atom)
await writeFileAt("feed/feed.json", `${JSON.stringify(jsonFeed, null, 2)}\n`)

console.log(
	`prerendered ${routes.length} pages + 404, ${posts.length} in sitemap and feeds ` +
		`(${allPosts.length - posts.length} drafts noindexed)`,
)
