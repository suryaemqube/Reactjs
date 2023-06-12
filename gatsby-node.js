const axios = require('axios');
const path = require('path');

exports.createPages = async ({ page, actions }) => {
  const { createPage } = actions;

  // Fetch data from the WordPress API
  const response = await axios.get('https://dubaibizbuzz.emqubeweb.com/wp-json/wp/v2/insights');
  const insights = response.data;

  // Create a page for each insight post
  insights.forEach((insight) => {
    createPage({
      path: `/posts/${insight.slug}`,
      component: require.resolve('./src/templates/postdetail.js'),
      context: {
        slug: insight.slug,
      },
    });
  });


  if (page.path.match(/^\/contact\/?$/)) {
    page.matchPath = '/contact/*';
    createPage(page);
    createPage({
      ...page,
      path: '/thankyou',
      context: {
        ...page.context,
        originalPath: page.path,
      },
    });
  }

};

