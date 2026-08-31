import { Link } from "wouter"
import { site } from "../config"

/**
 * Sits above the title on every page, so posts and /projects get it too and not
 * just the home page.
 *
 * The site name lives here now, which is why the home page heading is only the
 * tagline. Repeating "Purple Royale" twice, once here and once as the h1 right
 * underneath, read as a mistake.
 */
export function SiteHeader() {
	return (
		<nav className="not-prose border-on-background/15 mb-12 flex items-baseline justify-between gap-4 border-b pb-3">
			<Link href="/" className="text-on-background font-semibold no-underline">
				{site.name}
			</Link>

			<span className="flex gap-4 text-sm">
				<Link href="/" className="text-accent no-underline hover:underline">
					posts
				</Link>
				<Link href="/projects" className="text-accent no-underline hover:underline">
					projects
				</Link>
				<Link href="/ai" className="text-accent no-underline hover:underline">
					ai
				</Link>
				<a
					href={`https://github.com/${site.social.github}`}
					className="text-accent no-underline hover:underline"
					rel="noreferrer"
				>
					github ↗
				</a>
			</span>
		</nav>
	)
}
