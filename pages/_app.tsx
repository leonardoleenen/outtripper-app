/* eslint-disable react/jsx-props-no-spreading */
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withReduxStore from '../lib/with-redux-store'
import '../statics/style/style.scss'


interface Props {
    reduxStore: any
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
