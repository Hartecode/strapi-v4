'use strict';

const axios = require("axios");
const pluginId = require("../../admin/src/pluginId");

const url = (accountId, projectName) => `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`;
const dateTime = (rawDate) => {
  const date = new Date(rawDate);
  // get the date as a string
  const cleanDate = date.toDateString();
  // get the time as a string
  const time = date.toLocaleTimeString();
  return {
    date: cleanDate,
    time
  }
}

const checkConfig = (configVariables) => {
  return Object.keys(configVariables).filter(key => !configVariables[key]);
}


module.exports = {
  index(ctx) {
    console.log('hey')
    ctx.body = strapi
      .plugin('cloudflare-publish')
      .service('myService')
      .getWelcomeMessage();
  },
  async check (ctx) {
    const accountId = strapi.config.get('plugin.cloudflare-publish.accountId');
    const projectName = strapi.config.get('plugin.cloudflare-publish.projectName');
    const authEmail = strapi.config.get('plugin.cloudflare-publish.authEmail');
    const authKey = strapi.config.get('plugin.cloudflare-publish.authKey');

    const emptyValues = checkConfig({
      accountId,
      projectName,
      authEmail,
      authKey
    });
    
    if (emptyValues.length > 0) {
      return ctx.internalServerError(`The following config variables are required: ${emptyValues.join(',')}`)
    }
 
    const headers = {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey,
    };

    try {
      const apiUrl = url(accountId, projectName)
      const { data } = await axios.get(
        apiUrl,
        {
          headers,
        }
      );
      const currentDeployment = data.result[0];
      const busy = !(currentDeployment &&  currentDeployment["latest_stage"].name === "deploy");
      let deploy = null;

      if (currentDeployment) {
        const rawDate = currentDeployment["latest_stage"].ended_on;
        const { date, time } = dateTime(rawDate);
        deploy = {
          status: currentDeployment["latest_stage"].status,
          shortId: currentDeployment.short_id,
          siteUrl: currentDeployment.aliases ? currentDeployment.aliases[0] : `https://${currentDeployment.project_name}.pages.dev`,
          previewURl: currentDeployment.url,
          deploymentTime: {
            raw: currentDeployment.latest_stage.ended_on,
            date,
            time
          }
        };
      }

      return ctx.body = {
        numberOfDeploys: data['result_info']['total_count'],
        busy,
        status: currentDeployment.latest_stage.name,
        deploy
      };
    } catch(e) {
      return ctx.internalServerError('Issue with cloudflare');
    }
  },
  async publish (ctx) {
    const accountId = strapi.config.get('plugin.cloudflare-publish.accountId');
    const projectName = strapi.config.get('plugin.cloudflare-publish.projectName');
    const authEmail = strapi.config.get('plugin.cloudflare-publish.authEmail');
    const authKey = strapi.config.get('plugin.cloudflare-publish.authKey');

    const emptyValues = checkConfig({
      accountId,
      projectName,
      authEmail,
      authKey
    });
    
    if (emptyValues.length > 0) {
      return ctx.internalServerError(`The following config variables are required: ${emptyValues.join(',')}`)
    }
 
    const headers = {
      "X-Auth-Email": authEmail,
      "X-Auth-Key": authKey,
    };

    const apiUrl = url(accountId, projectName);

    try{
      const { data } = await axios.post(apiUrl, {}, { headers });
  
      return ctx.body = { success: data.success, result: data.result };
    } catch (err) {
      console.log(err)
      return ctx.internalServerError('There with the publish request.');
    }
  
  },
};
