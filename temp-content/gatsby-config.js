const GOOGLE_ANALYTICS_ID = 'UA-141718871-1'


module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: GOOGLE_ANALYTICS_ID,
                head: true,
            },
        },
        'gatsby-plugin-feed',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Purple Royale',
                short_name: 'pvin.is',
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'content/assets/colors-small.png',
            },
        },
        'gatsby-plugin-emotion',
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                custom: {
                    families: ['Iosevka Web'],
                    urls: ['/fonts/iosevka/webfont.css'],
                },
            },
        },
    ],
}
