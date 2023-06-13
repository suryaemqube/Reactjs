// gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
   query {
  wpgraphql {
    insights {
      edges {
        node {
          id
          slug
          title
          excerpt
          link
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          digital {
          insightsDigitally {
            digitallyDescription
            digitallyName
            digitallyImage {
              mediaItemUrl
            }
          }
        }
        }
      }
    }
  }
}
  `);

  if (result.errors) {
    console.error('Error retrieving WordPress data:', result.errors);
    return;
  }

  console.log(result.data)

  const { edges } = result.data.wpgraphql.insights;

  console.log(edges)
  edges.forEach(({ node }) => {
    createPage({
      path: `/insights/${node.slug}`,
      component: path.resolve('./src/templates/CustomPostDetail.js'),
      context: {
        post: node,
      },
    });
  });
};
