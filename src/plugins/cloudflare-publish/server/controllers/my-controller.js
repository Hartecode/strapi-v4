'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('cloudflare-publish')
      .service('myService')
      .getWelcomeMessage();
  },
};
