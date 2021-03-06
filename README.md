# pvin.is blog!

[![Netlify Status](https://api.netlify.com/api/v1/badges/94dd4712-edbd-405e-91d8-2be47d393e24/deploy-status)](https://app.netlify.com/sites/pvinis-blog/deploys)

used https://github.com/JoseRFelix/nextjs-starter-blog for template
## ✏ Features

- Streamlined styling experience with [Tailwind.css](https://tailwindcss.com/).
- Customizable typographic defaults with [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- Markdown code highlighting with [react-syntax-highlighter](https://www.npmjs.com/package/react-syntax-highlighter) and [PrismJs](https://prismjs.com/).

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## ✍ Customizing Tailwind Typography

[Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) is an official tailwind plugin that provides a set of `prose` classes to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown, or pulled from a CMS).

To customize the defaults provided by the plugin, add the overrides under the `typography` key in the theme section of the `tailwind.config.js` file. Refer to its [default styles](https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js) for more in-depth examples.

For more information, please check out Tailwind Typography's [customization section](https://github.com/tailwindlabs/tailwindcss-typography#customization).


### docs

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind Documentation](https://tailwindcss.com/) - learn about Tailwind CSS features and API.

## todo

- add a script to create a new post
- add scripts to share/distribute my posts to dev.to, medium, whatever
- add decade eslint
-hide drafts on postfooter too
- add dates on pist folders
