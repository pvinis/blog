import React from 'react'
import { Link } from 'gatsby'
import { Global, css } from '@emotion/core'

import { rhythm, scale } from '../utils/typography'



class Layout extends React.Component {
    render() {
        const { location, title, children } = this.props
        const rootPath = `${__PATH_PREFIX__}/`
        let header

        if (location.pathname === rootPath) {
            header = (
                <h1
                    style={{
                        ...scale(1.5),
                        marginBottom: rhythm(1.5),
                        marginTop: 0,
                    }}
                >
                    <Link
                        style={{
                            boxShadow: 'none',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                        to={'/'}
                    >
                        {title}
                    </Link>
                </h1>
            )
        } else {
            header = (
                <h3
                    style={{
                        fontFamily: 'Iosevka, Montserrat, sans-serif',
                        marginTop: 0,
                    }}
                >
                    <Link
                        style={{
                            boxShadow: 'none',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                        to={'/'}
                    >
                        {title}
                    </Link>
                </h3>
            )
        }
        return (
            <div>
                <Global
                    styles={{
                        '@font-face': {
                            fontFamily: 'Iosevka',
                            src: 'url(/fonts/iosevka-light.woff2) format(woff2), url(/fonts/iosevka-light.woff) format(woff)',
                        },
                    }}
                />
                <div
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        maxWidth: rhythm(24),
                        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
                    }}
                >
                    <header>{header}</header>
                    <main>{children}</main>
                    <footer>
                    © {new Date().getFullYear()}, Built by
                        {' '}
                        <a href="https://www.github.com/pvinis">pvinis</a>
                        {' '}
                    using
                        {' '}
                        <a href="https://www.gatsbyjs.org">Gatsby</a>
                        {' '}
                    hosted at
                        {' '}
                        <a href="https://github.com/pvinis/blog">GitHub</a>
                        {' '}
                    with 💜
                    </footer>
                </div>
            </div>
        )
    }
}

export default Layout
