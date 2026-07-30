import { site } from "./config"
import { getPost } from "./posts"

/**
 * Head tags are computed here as plain data, not as React elements, so the
 * prerender step can write them straight into <head>.
 *
 * This used to go through react-helmet-async. Under React 19 + hydrateRoot it
 * removed its own server-rendered tags on mount and never put them back, which
 * left a crawler that runs js looking at a page with no canonical at all.
 */
export interface Head {
	title: string
	description: string
	/** absent on the 404 page. a page that does not exist should not claim to be canonical. */
	canonical?: string
	type: "website" | "article"
	noindex: boolean
	favicon?: string
	publishedAt?: string
}

/** no trailing slash anywhere, so the home page is https://pvin.is not https://pvin.is/ */
export function canonicalUrl(path: string): string {
	return `${site.url}${path.replace(/\/+$/, "")}`
}

function faviconFor(emoji?: string, explicit?: string): string | undefined {
	if (explicit) return explicit
	if (!emoji) return undefined

	return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`
}

/** the head for a url. mirrors the routes in App.tsx. */
export function headFor(path: string): Head {
	if (path === "/") {
		return {
			title: site.title,
			description: site.description,
			canonical: canonicalUrl("/"),
			type: "website",
			noindex: false,
		}
	}

	const slug = path.startsWith("/posts/") ? path.slice("/posts/".length) : undefined
	const post = slug ? getPost(slug) : undefined

	if (post) {
		const { attributes } = post

		return {
			title: `${attributes.title} - ${site.name}`,
			description: attributes.description ?? `Post: ${attributes.title}`,
			canonical: canonicalUrl(path),
			type: "article",
			noindex: attributes.draft === true,
			favicon: faviconFor(attributes.faviconEmoji, attributes.favicon),
			publishedAt: post.date.toISOString(),
		}
	}

	return {
		title: `4 oh 4 - ${site.name}`,
		description: "Page not found",
		type: "website",
		noindex: true,
	}
}

function escapeAttr(value: string): string {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

/** the <head> contents for a url, as html. used by the prerender step. */
export function renderHead(path: string): string {
	const head = headFor(path)
	const attr = escapeAttr

	const tags = [
		`<title>${attr(head.title)}</title>`,
		`<meta name="description" content="${attr(head.description)}" />`,
		head.canonical ? `<link rel="canonical" href="${attr(head.canonical)}" />` : undefined,
		head.noindex ? `<meta name="robots" content="noindex, follow" />` : undefined,
		`<meta property="og:type" content="${head.type}" />`,
		`<meta property="og:site_name" content="${attr(site.name)}" />`,
		`<meta property="og:title" content="${attr(head.title)}" />`,
		`<meta property="og:description" content="${attr(head.description)}" />`,
		head.canonical ? `<meta property="og:url" content="${attr(head.canonical)}" />` : undefined,
		`<meta name="twitter:card" content="summary" />`,
		`<meta name="twitter:creator" content="@${site.social.twitter}" />`,
		head.publishedAt ? `<meta property="article:published_time" content="${head.publishedAt}" />` : undefined,
		head.publishedAt ? `<meta property="article:author" content="${attr(site.author.name)}" />` : undefined,
		head.favicon ? `<link rel="icon" href="${attr(head.favicon)}" />` : undefined,
	]

	return tags.filter(Boolean).join("\n\t")
}
