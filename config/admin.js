module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5c366c6ad5e776f5fc07b852c2d805a0'),
  },
});
