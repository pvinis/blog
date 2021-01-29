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
// theme_color: '#663399',
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
