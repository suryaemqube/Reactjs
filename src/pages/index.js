import * as React from "react"
import Layout from "../components/Layout"
import Images from "../examples/Images"
import { Seo } from "../components/SeoMeta"


export default function Home() {
  return (
    <Layout>
      <h1>Home page</h1>
      <Images />
    </Layout>
  )

}
export const Head = () => (
  <Seo />
)