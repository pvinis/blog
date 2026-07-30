import "./globals.css"
import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { App } from "./App"

const container = document.getElementById("root")!
const app = (
	<StrictMode>
		<App />
	</StrictMode>
)

// prod is prerendered, so there is real markup to hydrate. dev serves the bare
// template, so mount fresh instead.
//
// firstElementChild, not hasChildNodes: in dev the root still holds the
// <!--app-html--> placeholder, and a comment counts as a child node, so
// hasChildNodes sent dev down the hydrate path and every load threw.
if (container.firstElementChild) {
	hydrateRoot(container, app)
} else {
	createRoot(container).render(app)
}
