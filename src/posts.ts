import fm from "front-matter"
import { SupportedFrontMatter } from "./types"

// vite resolves this at build time, so we get the full list of posts without
// a manifest to keep in sync. raw markdown, parsed once at module load.
const files = import.meta.glob("./posts/*.md", {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>

export interface Post {
	slug: string
	date: Date
	body: string
	attributes: SupportedFrontMatter
}

function toPost(path: string, raw: string): Post {
	const slug = path.replace(/^\.\/posts\//, "").replace(/\.md$/, "")
	const { attributes, body } = fm<SupportedFrontMatter>(raw)

	return { slug, date: new Date(attributes.date), body, attributes }
}

// everything, drafts included. the prerender step needs this so draft urls get
// a real html file too.
export const allPosts: Post[] = Object.entries(files)
	.map(([path, raw]) => toPost(path, raw))
	.sort((a, b) => b.date.getTime() - a.date.getTime())

// what the home page lists. drafts stay reachable at their own url, they just
// do not get advertised. still listed in dev so you can find the thing you are
// in the middle of writing.
export const posts: Post[] = allPosts.filter((post) => import.meta.env.DEV || !post.attributes.draft)

// any post by slug, drafts included, so a draft url keeps working in production.
export function getPost(slug: string): Post | undefined {
	return allPosts.find((post) => post.slug === slug)
}

// UTC, otherwise a late-evening timestamp like init-commit's 22:41Z renders as
// the next day for anyone east of greenwich.
export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	})
}
