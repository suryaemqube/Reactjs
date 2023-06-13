/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Default title`,
    description: `Default description`,
    image: `wp-content/themes/allaboutvat/images/favicon.png`,
    siteUrl: `https://dubaibizbuzz.emqubeweb.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'wpgraphql',
        fieldName: 'wpgraphql',
        url: `https://dubaibizbuzz.emqubeweb.com/graphql`,
      },
    },
  ],
  // plugins: [
  //   {
  //     resolve: 'gatsby-source-graphql',
  //     options: {
  //       typeName: 'WPGraphQL',
  //       fieldName: 'wpgraphql',
  //       url: 'https://dubaibizbuzz.emqubeweb.com/graphql',
  //     },
  //   },
  // ],
};

