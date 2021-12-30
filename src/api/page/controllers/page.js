'use strict';

/**
 *  page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async staticPaths(ctx) {
    try {
      const entities = await strapi.db.query('api::page.page').findMany({ // uid syntax: 'api::api-name.content-type-name'
        select: ['static_path'],
      });
      
      const paths = entities.map(page => ({
        params: page.static_path
      }));
  
      ctx.body = paths;
    } catch (err) {
      ctx.body = err;
    }
    
  },
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async findOne(ctx) {
    const { slug } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.db.query('api::page.page').findOne({
      ...query,
      where: {
        slug
      }
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
