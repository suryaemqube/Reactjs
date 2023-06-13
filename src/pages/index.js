import * as React from "react"
import Layout from "../components/Layout"
import Images from "../examples/Images"
import { Seo } from "../components/SeoMeta"
import CustomPostList from '../components/CustomPostList';



export default function Home() {

  return (
    <Layout>
      <h1>Home page</h1>
      <Images />
      <CustomPostList />
    </Layout>
  )

}
export const Head = () => (
  <Seo />
)