import { useEffect } from "react"
import { useLocation } from "wouter"
import { headFor } from "./seo"

/**
 * The whole head is written once by the prerender step, so nothing in the react
 * tree renders head tags.
 *
 * The one thing that still has to react to navigation is the tab title, and
 * setting it here rather than rendering a <title> matters: react 19 hoists any
 * <title> it finds to the front of the ssr output, which lands inside #root and
 * leaves the document with two of them.
 */
export function useDocumentTitle() {
	const [location] = useLocation()

	useEffect(() => {
		document.title = headFor(location).title
	}, [location])
}
