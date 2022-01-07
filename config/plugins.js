module.exports = ({ env }) =>  ({
  // ...
  'wysiwyg': {
    enabled: true,
    resolve: './src/plugins/wysiwyg'
  },
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
  // ...
})