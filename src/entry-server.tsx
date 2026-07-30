import { StrictMode } from "react"
import { renderToStaticMarkup, renderToString } from "react-dom/server"
import { App } from "./App"
import { MDRenderer } from "./components/MDRenderer"
import { renderHead } from "./seo"

export { allPosts, posts, formatDate } from "./posts"
export { site } from "./config"

/**
 * react 19 hoists resource hints, currently a <link rel="preload"> for the
 * profile image, to the very start of the rendered string. left alone they end
 * up inside #root, which is not where a link tag belongs, so lift them into the
 * head we are building.
 */
const HOISTED = /^(?:<link\b[^>]*>)+/

/** render one route to html, plus the <head> contents for it. */
export function render(url: string): { html: string; head: string } {
	const rendered = renderToString(
		<StrictMode>
			<App ssrPath={url} />
		</StrictMode>,
	)

	const hoisted = rendered.match(HOISTED)?.[0] ?? ""
	const html = rendered.slice(hoisted.length)
	const head = [renderHead(url), hoisted].filter(Boolean).join("\n\t")

	return { html, head }
}

/**
 * markdown to html, for putting real post content in the feeds.
 *
 * react 19 hoists <link rel="preload"> hints for any images it finds. those are
 * a browser optimisation and have no business in a feed, so they get stripped.
 */
export function renderMarkdown(body: string): string {
	return renderToStaticMarkup(<MDRenderer text={body} />).replace(/<link\b[^>]*>/g, "")
}
