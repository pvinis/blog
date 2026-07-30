import { Helmet } from "react-helmet-async"
import { Link } from "wouter"
import { site } from "../config"

export function NotFound() {
	return (
		<>
			<Helmet>
				<title>{`4 oh 4 - ${site.name}`}</title>
				<meta name="description" content="Page not found" />
			</Helmet>

			<h1>404</h1>
			<p>Nothing here.</p>
			<Link href="/" className="text-accent no-underline hover:underline">
				back to all posts
			</Link>
		</>
	)
}
