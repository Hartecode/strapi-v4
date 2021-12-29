module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/pages/:slug',
      handler: 'page.findOne',
    }
  ]
};