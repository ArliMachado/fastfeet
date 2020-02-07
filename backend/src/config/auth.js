require('../bootstrap');

module.exports = {
  secret: process.env.APP_SECRET,
  expiresIn: process.env.TOKEN_TIMEOUT,
};
