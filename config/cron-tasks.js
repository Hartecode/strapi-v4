/**
 * Page scheduling system
 * @param {object} strapi 
 */
async function schedulePagePublication(strapi) {
    const draftPagesToPublish = await strapi.entityService.findMany(
        'api::page.page',
        {
            publicationState: 'preview',
            filters: {
                publishedAt: {
                    $null: true
                }, 
                publish_at: {
                    $lt: new Date()
                }
            }
        });

    // update publishedAt of pages
    await Promise.all(draftPagesToPublish.map(page => {
    return strapi.entityService.update(
        'api::page.page',
        page.id,
        { 
            data: {
                publishedAt: new Date()
            }
        });
    }));
}


module.exports = {
  /**
   * Runs every 10 mins
   */
  '*/10 * * * *': async ({ strapi }) => {
    await schedulePagePublication(strapi)
  },
};
 