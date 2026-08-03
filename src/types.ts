export type SupportedFrontMatter = {
	title: string
	date: string
	favicon?: string
	faviconEmoji?: string
	description?: string
	tags?: string[]
	draft?: boolean
	/** set when the post really lives on another site. the index links straight there. */
	external?: string
}
