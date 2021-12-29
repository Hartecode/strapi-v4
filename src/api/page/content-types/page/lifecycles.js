'use strict';

/**
 * Updated children pages paths and static path 
 * @param {string} parentId - parent id
 * @param {object} parentData - page data
 */
async function updateChildPath(id, 
  { path:parentPath,
    static_path:parentStaticPath }) {
  let staticPath = {
    slug: [...parentStaticPath.slug]
  }
  const childPage = await strapi.db.query('api::page.page').findOne({ where: { id } })

  staticPath.slug.push(childPage.slug);
  const path = `${parentPath}/${childPage.slug}`

  let entry = await strapi.db.query('api::page.page').update({
    where: { id },
    data: {
      path,
      static_path: staticPath
    },
  });
  
  await updateChildrenPaths(entry.id);
}

/**
 * Updated children pages paths and static path 
 * @param {string} parentId - parent id
 */
async function updateChildrenPaths(parentId) {
  const parentData = await strapi.db.query('api::page.page').findOne({
    where: { id: parentId },
    populate: { children: true } });
  
  await (parentData.children || []).forEach(async child => {
    const id = typeof child === 'number' ? child : child.id;
    await updateChildPath(id, parentData);
  })
}

/**
 * generates the page path and static path
 * @param {Object} data - page data
 * @returns {Object} page data
 */
async function generateFullPath(data) {
  let dataClone = JSON.parse(JSON.stringify(data));
  let staticPath = {
    slug: []
  }

  if (dataClone.slug && !dataClone.home_page) {
    let parentPath = ''
    if(dataClone.parent) {
      const parentPage = await strapi.db.query('api::page.page').findOne({
        where: { id: dataClone.parent }
      });
      parentPath = parentPage.path || '';
      if (parentPage.static_path) staticPath.slug = parentPage.static_path.slug;
    }
    staticPath.slug.push(dataClone.slug);
    dataClone.static_path = staticPath;
    dataClone.path = `${parentPath}/${dataClone.slug}`;
  } else if (dataClone.home_page) {
    staticPath.slug.push('');
    dataClone.path = '/';
    dataClone.static_path = staticPath;
  }

  return dataClone;
}

module.exports =  {
  beforeCreate: async (event) => {
    let { data } = event.params;
    data = await generateFullPath(data);
  },
  beforeUpdate: async (event) => {
    let { where, data } = event.params;

    if (typeof where.id === 'number') {
      event.params.data = await generateFullPath(data);
    }
  },
  afterCreate: async (event) => {
    let { where } = event.params;
    const id = typeof where.id === 'number'? where.id : where.id?.id;
    await updateChildrenPaths(id);
  },
  afterUpdate: async (event) => {
    let { where } = event.params;
    const id = typeof where.id === 'number'? where.id : where.id?.id;
    await updateChildrenPaths(id);
  }
};