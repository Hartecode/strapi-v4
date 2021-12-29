'use strict';

/**
 *  page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({ strapi }) =>  ({
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
