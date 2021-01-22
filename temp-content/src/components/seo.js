/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { map, pipe, keys } from 'ramda'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import Fonts from '../utils/fonts'


function SEO({ description, lang, meta, keywords, title }) {
    const { site } = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
    )

    const metaDescription = description || site.siteMetadata.description

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            link={
                pipe(
                    keys,
                    map(key => ({
                        rel: 'preload',
                        href: `/fonts/${Fonts.Iosevka[key].name}.woff2`,
                        as: 'font',
                        type: 'font/woff2',
                        crossOrigin: 'anonymous',
                    }))
                )(Fonts.Iosevka)
            }
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    name: 'twitter:card',
                    content: 'summary',
                },
                {
                    name: 'twitter:creator',
                    content: site.siteMetadata.author,
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
            ]
                .concat(
                    keywords.length > 0
                        ? {
                            name: 'keywords',
                            content: keywords.join(', '),
                        }
                        : []
                )
                .concat(meta)}
        />
    )
}

SEO.defaultProps = {
    lang: 'en',
    meta: [],
    keywords: [],
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.array,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
}

export default SEO
