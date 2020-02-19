/* eslint-disable react/jsx-props-no-spreading */
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import Head from 'next/head'
import withReduxStore from '../lib/with-redux-store'
import '../public/styles/style.css'


interface Props {
    reduxStore: any
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link href="/img/splash1242x2208.png" sizes="1242x2208" rel="apple-touch-startup-image" />
          <link href="/img/splash6401136.png" sizes="640x1136" rel="apple-touch-startup-image" />
          <link href="/img/splash7501334.png" sizes="750x1334" rel="apple-touch-startup-image" />
          <link href="/img/splash11252436.png" sizes="1125x2436" rel="apple-touch-startup-image" />
          <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/img/splash11252436.png" />
          <link href="/img/splash15362048.png" sizes="1536x2048" rel="apple-touch-startup-image" />
          <link href="/img/splash16682224.png" sizes="1668x2224" rel="apple-touch-startup-image" />
          <link href="/img/splash20482732.png" sizes="2048x2732" rel="apple-touch-startup-image" />
          <link rel="apple-touch-icon" href="/img/logo120.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
