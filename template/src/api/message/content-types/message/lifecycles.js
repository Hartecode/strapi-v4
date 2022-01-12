'use strict';


module.exports =  {
  afterCreate: async ({ result, where }) => {
    console.log(result, where);
    const sent  = await strapi.plugins['email'].services.email.send({
      to: 'scsharte@gmail.com',
      from: 'test@gmail.com',
      subject: `New Contact Us Message - id: ${result.id}`,
      html: `
        <h1>New Message</h1>
        <ul>
          ${Object.keys(result).reduce((acc,cur) => {
            return `${acc}
              <li>${cur}: ${result[cur]}</li>
            ` 
          }, '')}
        </ul>
      `,
    });

    console.log(sent);
  }
};