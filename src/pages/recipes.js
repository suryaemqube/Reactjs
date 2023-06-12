import React from 'react'
import Layout from '../components/Layout'
import { Seo } from '../components/SeoMeta'

const Recipes = () => {
    return (
        <Layout>
            <h1>recipes page</h1>
        </Layout>
    )
}

export default Recipes

export const Head = () => (
    <Seo title="Recipes" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
)