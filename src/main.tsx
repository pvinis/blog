import "./globals.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Providers } from "./components/Providers"
import { Link, Route } from "wouter"
import { Post } from "./pages/Post"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<div className="prose prose-quoteless mx-auto max-w-prose bg-background px-6 pb-16 pt-32 lg:prose-xl dark:prose-invert prose-blockquote:font-normal prose-blockquote:text-gray-400 2xl:max-w-[1000px]">
				<Route path="/">
					<div>Hello</div>
					<Link href="/posts/2024-12-10-december-challenge-4">December Challenge #4</Link>
				</Route>
				<Route path="/posts/:slug">{(params) => <Post slug={params.slug} />}</Route>
			</div>
		</Providers>
	</StrictMode>,
)

