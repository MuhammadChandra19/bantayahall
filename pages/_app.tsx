import React from 'react';
import App, { AppInitialProps } from 'next/app'
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { AppStore } from '../util/redux/store';
import { Store } from 'redux';
import Router from 'next/router';

interface Props extends AppInitialProps {
  store: Store
}

import NProgress from 'nprogress'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App<Props> {

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    console.log('reload')
    //Anything returned here can be accessed by the client
    return { pageProps: pageProps };
  }



  render() {

    //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Provider store={AppStore}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

const makeStore = () => AppStore;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);