import { Link } from "wouter"
import { posts, formatDate } from "../posts"
import { site } from "../config"
import { Seo } from "../components/Seo"
import profile from "../assets/profile.png"

export function Home() {
	return (
		<>
			<Seo title={site.title} description={site.description} path="/" />

			<h1 className="mb-2">{site.name}</h1>

			<div className="mb-14 flex items-center gap-3 not-prose">
				<img src={profile} alt="" className="h-14 w-14 shrink-0 rounded-full" />
				<p className="text-on-background text-base leading-7">
					Written by <b className="font-semibold">{site.author.name}</b> {site.author.summary}{" "}
					<a href={`https://github.com/${site.social.github}`}>You can find him on github</a>.
				</p>
			</div>

			{posts.map((post) => (
				<article key={post.slug} className="mb-10">
					<h2 className="mb-1">
						<Link href={`/posts/${post.slug}`} className="text-accent no-underline hover:underline">
							{post.attributes.draft && <span className="mr-2 opacity-60">[draft]</span>}
							{post.attributes.title}
						</Link>
					</h2>
					<span className="text-sm opacity-70">{formatDate(post.date)}</span>
					{post.attributes.description && <p className="mt-2">{post.attributes.description}</p>}
				</article>
			))}
		</>
	)
}
