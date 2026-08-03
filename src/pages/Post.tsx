import { Link } from "wouter"
import { MDRenderer } from "../components/MDRenderer"
import { getPost, formatDate, externalHost } from "../posts"
import { NotFound } from "./NotFound"

interface PostProps {
	slug: string
}

export function Post({ slug }: PostProps) {
	const post = getPost(slug)

	if (!post) return <NotFound />

	const { attributes } = post
	const { external } = attributes

	return (
		<>
			<h1 className="mb-1">
				{attributes.draft && <span className="mr-2 opacity-60">[draft]</span>}
				{attributes.title}
			</h1>
			<p className={`mt-0 text-sm opacity-70 ${external ? "mb-2" : "mb-10"}`}>
				{formatDate(post.date)}
			</p>

			{/* the real article is elsewhere, so say it above the body. someone who got
			    here from a feed should not have to read to the end to find that out. */}
			{external && (
				<p className="mt-0 mb-10 text-sm">
					Originally published on{" "}
					<a href={external} className="text-accent">
						{externalHost(external)} ↗
					</a>
				</p>
			)}

			<MDRenderer text={post.body} />

			<hr className="mt-14" />
			<Link href="/" className="text-accent no-underline hover:underline">
				back to all posts
			</Link>
		</>
	)
}
