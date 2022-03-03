// import AuthLogo from './extensions/my-logo.png';
import MenuLogo from './extensions/logo.png';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: MenuLogo,
    },
   // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Add a new locale, other than 'en'
    locales: ['en'],
    // Replace the Strapi logo in the main navigation
    translations: {
        en: {
          "app.components.LeftMenu.navbrand.title": "Hartecode Dashboard",
        },
    },
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
    },
   // Disable video tutorials
    tutorials: true,
   // Disable notifications about new Strapi releases
    notifications: { release: true },
  },

  bootstrap() {},
};
