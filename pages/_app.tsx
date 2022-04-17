import Layout from "component/layout";
import Loader from "component/loader";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import TestMode from "component/testMode";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  if (loading) {
    return <Loader type="bars" color="black" />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TestMode/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
