import { Link } from "wouter"
import { MDRenderer } from "../components/MDRenderer"
import { getPost, formatDate } from "../posts"
import { site } from "../config"
import { Seo } from "../components/Seo"
import { NotFound } from "./NotFound"

interface PostProps {
	slug: string
}

export function Post({ slug }: PostProps) {
	const post = getPost(slug)

	if (!post) return <NotFound />

	const { attributes } = post
	const description = attributes.description ?? `Post: ${attributes.title}`
	const favicon = attributes.favicon
		? attributes.favicon
		: attributes.faviconEmoji
			? `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${attributes.faviconEmoji}</text></svg>`
			: undefined

	return (
		<>
			<Seo
				title={`${attributes.title} - ${site.name}`}
				description={description}
				path={`/posts/${post.slug}`}
				favicon={favicon}
				article={{ publishedAt: post.date }}
			/>

			<h1 className="mb-1">
				{attributes.draft && <span className="mr-2 opacity-60">[draft]</span>}
				{attributes.title}
			</h1>
			<p className="mt-0 mb-10 text-sm opacity-70">{formatDate(post.date)}</p>

			<MDRenderer text={post.body} />

			<hr className="mt-14" />
			<Link href="/" className="text-accent no-underline hover:underline">
				back to all posts
			</Link>
		</>
	)
}
