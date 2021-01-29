const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images');

	// rewrites: () => ([
		// {source: "feed/:slug",
		// destination: '/feed/atom'
	// }
	// ])
//
module.exports = withPlugins([
	optimizedImages,
])

	// webpack: (config, { isServer }) => {
	  // Fixes npm packages that depend on `fs` module
	//   if (!isServer) {
		// config.node = {
		//   fs: 'empty'
		// }
	//   }

	//   return config
	// }
	// }
