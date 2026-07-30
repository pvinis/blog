import { Link } from "wouter"
import { site } from "../config"
import { Seo } from "../components/Seo"

export function NotFound() {
	return (
		<>
			<Seo title={`4 oh 4 - ${site.name}`} description="Page not found" path="/404" />

			<h1>404</h1>
			<p>Nothing here.</p>
			<Link href="/" className="text-accent no-underline hover:underline">
				back to all posts
			</Link>
		</>
	)
}
