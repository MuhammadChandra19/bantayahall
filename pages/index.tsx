// import Head from 'next/head'

import Head from '../views/components/Head'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head pageTitle="nyi roro wetan" description="this is only template">
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <h1>hello world</h1>
    </main>
  </div>
)

export default Home
