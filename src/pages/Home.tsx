import { Link } from "wouter"
import { posts, formatDate } from "../posts"
import { site } from "../config"
import profile from "../assets/profile.png"

export function Home() {
	return (
		<>
			<h1 className="mb-2">{site.title}</h1>

			<div className="mb-14 flex items-center gap-3 not-prose">
				<img src={profile} alt="" className="h-14 w-14 shrink-0 rounded-full" />
				<p className="text-on-background text-base leading-7">
					Written by <b className="font-semibold">{site.author.name}</b> {site.author.summary}{" "}
					<a href={`https://github.com/${site.social.github}`}>You can find him on github</a>.
				</p>
			</div>

			{posts.map((post) => {
				const { title, description, draft, external } = post.attributes
				const permalink = `/posts/${post.slug}`

				// built once, so the badge and title are not spelled out in both branches below.
				const heading = (
					<>
						{draft && <span className="mr-2 opacity-60">[draft]</span>}
						{title}
						{external && <span aria-hidden> ↗</span>}
					</>
				)

				return (
					<article key={post.slug} className="mb-10">
						{/* mb-1! because lg:prose-xl sets its own h2 margin-bottom, and at the same
						    specificity it is written later in the sheet, so a plain mb-1 loses from
						    lg up and the date drifts 32px away from its title. */}
						<h2 className="mb-1!">
							{external ? (
								<a href={external} className="text-accent no-underline hover:underline">
									{heading}
								</a>
							) : (
								<Link href={permalink} className="text-accent no-underline hover:underline">
									{heading}
								</Link>
							)}
						</h2>
						<span className="text-sm opacity-70">{formatDate(post.date)}</span>
						{description && <p className="mt-2">{description}</p>}
					</article>
				)
			})}
		</>
	)
}
