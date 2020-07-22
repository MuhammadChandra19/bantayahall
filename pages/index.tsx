import Layout from "../views/Layout/MainLayout"
import { useEffect } from "react"
import AppService from "../domain/app/service"


export const Home = (): JSX.Element => {

  useEffect(() => {
    const service = new AppService();
    service.initApp()
  })
  return (

    <Layout
      pageTitle="nyi roro wetan"
      description="this is only template"
    >
      <h1>hello world</h1>
    </Layout>
  )
}

export default Home
