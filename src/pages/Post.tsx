import { Helmet } from "react-helmet-async"
import { MDRenderer } from "../components/MDRenderer"
import { useEffect, useState } from "react"
import { SupportedFrontMatter } from "../types"
import fm from "front-matter"
import { useLocation } from "wouter"

function usePost(slug: string) {
	const [text, setText] = useState<string | null>(null)

	useEffect(() => {
		async function fetchPost() {
			const file = `../assets/posts/${slug}.md`
			const res = await fetch(file, {
				headers: {
					"Content-Type": "text/plain",
				},
			})
			console.log(res)
		}
		fetchPost()
	}, [slug])

	return { text }
}

interface PostProps {
	slug: string
}

export function Post({ slug }: PostProps) {
	const [, setLocation] = useLocation()
	const { text } = usePost(slug)

	// useEffect(() => {
	// 	const fetchPost = async () => {
	// 		try {
	// 			const file = `/posts/${slug}.md`
	// 			const res = await fetch(file)

	// 			if (!res.ok) {
	// 				if (res.status === 404) {
	// 					console.error(`Post "${slug}" not found`)
	// 					setLocation("/404")
	// 					return
	// 				}
	// 				throw new Error(`HTTP error! status: ${res.status}`)
	// 			}

	// 			const content = await res.text()
	// 			if (content.includes("<!DOCTYPE html>")) {
	// 				console.error(`Post "${slug}" not found`)
	// 				setLocation("/404")
	// 				return
	// 			}

	// 			setText(content)
	// 		} catch (e) {
	// 			console.error("Failed to fetch post:", e)
	// 			setLocation("/404")
	// 		}
	// 	}
	// 	fetchPost()
	// }, [slug, setLocation])

	if (!text) return null

	const { attributes } = fm<SupportedFrontMatter>(text)

	console.log("wil7")
	const description = attributes.description ?? `Post: ${attributes.title}`
	const favicon = attributes.favicon
		? attributes.favicon
		: attributes.faviconEmoji
			? `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${attributes.faviconEmoji}</text></svg>`
			: undefined

	return (
		<>
			<Helmet>
				{attributes.title && <title>{attributes.title}</title>}
				{<meta name="description" content={description} />}
				{favicon && <link rel="icon" href={favicon} />}
				{/* {favicon && <link rel="icon" href={favicon} media="(prefers-color-scheme: light)" />} */}
				{/* {favicon && <link rel="icon" href={favicon} media="(prefers-color-scheme: dark)" />} */}
			</Helmet>
			<MDRenderer text={text} />
		</>
	)
}

/// link to quad.codes
