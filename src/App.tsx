import { Route, Router, Switch } from "wouter"
import { SiteHeader } from "./components/SiteHeader"
import { Home } from "./pages/Home"
import { Post } from "./pages/Post"
import { Projects } from "./pages/Projects"
import { AiInfo } from "./pages/AiInfo"
import { NotFound } from "./pages/NotFound"
import { useDocumentTitle } from "./useDocumentTitle"

interface AppProps {
	/** the path being rendered. only set when prerendering, the browser uses the real location. */
	ssrPath?: string
}

export function App({ ssrPath }: AppProps) {
	return (
		<Router ssrPath={ssrPath}>
			<Shell />
		</Router>
	)
}

function Shell() {
	useDocumentTitle()

	return (
		<div className="prose prose-quoteless bg-background lg:prose-xl dark:prose-invert prose-blockquote:font-normal prose-blockquote:text-gray-400 mx-auto max-w-prose px-6 pt-32 pb-16 2xl:max-w-[1000px]">
			<SiteHeader />

			<Switch>
				<Route path="/" component={Home} />
				<Route path="/projects" component={Projects} />
				<Route path="/ai" component={AiInfo} />
				<Route path="/posts/:slug">{(params) => <Post slug={params.slug} />}</Route>
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}
