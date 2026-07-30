import "./globals.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Providers } from "./components/Providers"
import { Route, Switch } from "wouter"
import { Home } from "./pages/Home"
import { Post } from "./pages/Post"
import { NotFound } from "./pages/NotFound"

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
