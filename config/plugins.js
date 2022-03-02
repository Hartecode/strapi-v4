module.exports = ({ env }) =>  ({
  // ...
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env('DEFAULT_FROM'),
        defaultReplyTo: env('DEFAULT_REPLY_TO'),
      },
    },
  },
  'email-designer': {
    enabled: true,
  },
  navigation: {
    enabled: true,
    config: {
        additionalFields: [],
        contentTypes: ['api::page.page'],
        contentTypesNameFields: {
            'api::page.page': ['label']
        },
        allowedLevels: 2,
    }
  },
  seo: {
    enabled: true,
  },
  'wysiwyg': {
    enabled: true,
    resolve: './src/plugins/wysiwyg'
  },
  "cloudflare-publish": {
    enabled: true,
    resolve: './src/plugins/cloudflare-publish',
    config: {
      accountId: env('CLOUDFLARE_ACCOUNT_ID'),
      projectName: env('CLOUDFLARE_PROJECT_NAME'),
      authEmail: env('CLOUDFLARE_AUTH_EMAIL'),
      authKey: env('CLOUDFLARE_AUTH_KEY')
    }
  },
  // ...
})