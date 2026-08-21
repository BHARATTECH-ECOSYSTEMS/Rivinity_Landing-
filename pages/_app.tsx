import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Rivinity</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Rivinity - Build and deploy AI-powered applications with autonomous agents, collaborative workspaces, and instant edge deployment."
        />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
