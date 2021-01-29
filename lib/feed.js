import seoJson from '../config/seo.json'
import {markdown} from 'markdown'
import { Feed } from "feed";
import fs from "fs"
import { getSortedPosts } from 'lib/posts';

export const buildFeed = async () => {

const baseUrl = "https://pvin.is"
const feed = new Feed({

	title: seoJson.siteMetadata.title,
	description: seoJson.siteMetadata.description,
	id: seoJson.siteMetadata.siteUrl,
	link: seoJson.siteMetadata.siteUrl,
	language: seoJson.siteMetadata.language,
	image: 'content/assets/colors-small.png',
	// favicon
	copyright:`All rights reserved ${new Date().getFullYear()}, Pavlos Vinieratos`,
	updated: new Date(),
	// generator:
	feedLinks: {
		atom: `${baseUrl}/feed/atom.xml`,
		rss2: `${baseUrl}/feed/feed.xml`,
		json: `${baseUrl}/feed/feed.json`,
	},
	author:{
		name: seoJson.siteMetadata.author.name,
		email: "pavlos@p0l.co",
		link: "https://pvin.is"
	}
})

	const posts = await getSortedPosts()
	posts.forEach(post => {
		feed.addItem({
			title: post.frontmatter.title,
			id: post.slug,
			link: `${baseUrl}/posts/${post.slug}`,
			date: new Date(post.frontmatter.date),
			// content: post.content,
			content: markdown.toHTML(post.content),
		})
	})

	fs.mkdirSync("./public/feed", {recursive:true})
	fs.writeFileSync('./public/feed/atom.xml', feed.atom1())
	fs.writeFileSync('./public/feed/feed.xml', feed.rss2())
	fs.writeFileSync('./public/feed/feed.json', feed.json1())
	console.log('feeds generated')
}

