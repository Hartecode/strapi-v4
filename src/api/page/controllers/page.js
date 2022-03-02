'use strict';

/**
 * loop through obj and parse value string to boolean
 * @param {object} obj 
 */
const parseObjBooleans = (obj) => {
  const bool = ['true', 'false'];
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string' && bool.includes(obj[key])) {
      obj[key] = JSON.parse(obj[key]);
    }

    if (!Array.isArray(obj[key]) 
      && typeof obj[key] === 'object'
      && obj[key] !== null
    ) {
      parseObjBooleans(obj[key]);
    }
  });
}

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

    query.where = { ...query.where, slug };

    parseObjBooleans(query)

    const entity = await strapi.db.query('api::page.page').findOne(query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
