import Document, { Head, Main, NextScript, Html } from "next/document";

import { getSiteMetaData } from "@utils/helpers";

const GOOGLE_ANALYTICS_ID = 'UA-141718871-1'

export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head>
		<script
            dangerouslySetInnerHTML={{
              __html: `${GOOGLE_ANALYTICS_ID}`
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
