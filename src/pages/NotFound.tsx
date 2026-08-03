import { Link } from "wouter"

export function NotFound() {
	return (
		<>
			<h1>404</h1>
			<p>Nothing here.</p>
			<Link href="/" className="text-accent no-underline hover:underline">
				back to all posts
			</Link>
		</>
	)
}
