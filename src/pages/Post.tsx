import { Link } from "wouter"
import { MDRenderer } from "../components/MDRenderer"
import { getPost, formatDate } from "../posts"
import { NotFound } from "./NotFound"

interface PostProps {
	slug: string
}

export function Post({ slug }: PostProps) {
	const post = getPost(slug)

	if (!post) return <NotFound />

	const { attributes } = post

	return (
		<>
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
