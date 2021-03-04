import Document, { Head, Main, NextScript, Html } from "next/document";

import { getSiteMetaData } from "@lib/helpers"
import { GOOGLE_ANALYTICS_ID } from "@lib/gtag"


export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head>
	    <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          />
<script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                page_path: window.location.pathname,
              });
          `
            }}
          />

	</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
