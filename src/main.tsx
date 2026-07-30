import "./globals.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Providers } from "./components/Providers"
import { Route, Switch } from "wouter"
import { Home } from "./pages/Home"
import { Post } from "./pages/Post"
import { NotFound } from "./pages/NotFound"

// index.html ships static title/og/canonical defaults for link unfurlers and
// crawlers that do not run js. helmet appends rather than replacing them, which
// left the head with two titles and two canonicals, so drop them here and let
// helmet own it from this point on.
document.head.querySelectorAll("[data-static-meta]").forEach((el) => el.remove())

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<div className="prose prose-quoteless bg-background lg:prose-xl dark:prose-invert prose-blockquote:font-normal prose-blockquote:text-gray-400 mx-auto max-w-prose px-6 pt-32 pb-16 2xl:max-w-[1000px]">
				<Switch>
					<Route path="/" component={Home} />
					<Route path="/posts/:slug">{(params) => <Post slug={params.slug} />}</Route>
					<Route component={NotFound} />
				</Switch>
			</div>
		</Providers>
	</StrictMode>,
)
