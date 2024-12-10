import { Helmet } from "react-helmet-async"
import { MDRenderer } from "../components/MDRenderer"
import { useEffect, useState } from "react"
import { SupportedFrontMatter } from "../types"
import fm from "front-matter"

interface PostProps {
	slug: string
}

export function Post({ slug }: PostProps) {
	const [text, setText] = useState<string | null>(null)

	useEffect(() => {
		const fetchPost = async () => {
			const file = `/posts/${slug}.md`
			const res = await fetch(file)
			const content = await res.text()
			setText(content)
		}
		fetchPost()
	}, [slug])

	if (!text) return null

	const { attributes } = fm<SupportedFrontMatter>(text)

	const favicon = attributes.favicon
		? attributes.favicon
		: attributes.faviconEmoji
			? `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${attributes.faviconEmoji}</text></svg>`
			: undefined

	return (
		<>
			<Helmet>
				{attributes.title && <title>{attributes.title}</title>}
				{attributes.description && <meta name="description" content={attributes.description} />}
				{favicon && <link rel="icon" href={favicon} />}
				{/* {favicon && <link rel="icon" href={favicon} media="(prefers-color-scheme: light)" />} */}
				{/* {favicon && <link rel="icon" href={favicon} media="(prefers-color-scheme: dark)" />} */}
			</Helmet>

			<MDRenderer text={text} />
		</>
	)
}
