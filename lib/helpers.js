import SiteConfig from "@config/seo.json";


export function getSiteMetaData() {
  return SiteConfig.siteMetadata;
}

export const isDev = process.env.NODE_ENV === 'development'


export const draftsFilter = ({frontmatter: {draft}}) => {
	if (isDev) return true

	return draft !== true
}
