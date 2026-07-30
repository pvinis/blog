import { Helmet } from "react-helmet-async"
import { site } from "../config"

interface SeoProps {
	title: string
	description: string
	/** path this page lives at, e.g. "/posts/my-games". resolved against site.url */
	path: string
	favicon?: string
	article?: { publishedAt: Date }
}

export function Seo({ title, description, path, favicon, article }: SeoProps) {
	const url = new URL(path, site.url).toString()

	return (
		<Helmet>
			<html lang={site.language} />
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={url} />

			<meta property="og:type" content={article ? "article" : "website"} />
			<meta property="og:site_name" content={site.name} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content={`@${site.social.twitter}`} />

			{article && <meta property="article:published_time" content={article.publishedAt.toISOString()} />}
			{article && <meta property="article:author" content={site.author.name} />}

			{favicon && <link rel="icon" href={favicon} />}
		</Helmet>
	)
}
