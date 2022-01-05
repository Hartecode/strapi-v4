'use strict';

// slugs must be a string
const restrictiveSlugs = [
  '404'
];

/**
 * `page-adjuster` middleware.
 * This targets the content manager collection type for page api
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    
    // check that the page content is being changed
    if ( (ctx.request.method === 'PUT' || ctx.request.method === 'POST') &&
      ctx.request.url.includes('/content-manager/collection-types/api::page.page')) {
      // check if the slug is restrictive
      if (restrictiveSlugs.includes(ctx.request.body.slug)) {
        strapi.log.info( `restrictive slug: ${ctx.request.body.slug}`);
        return ctx.badRequest('Choose a different slug');
      }
    }
    await next();
  };
};
