module.exports = {
  PORT: process.env.PORT || 3000,
  DEV_PORT: (process.env.PORT && parseInt(process.env.PORT, 10) + 1) || 3001,
  HOST: process.env.HOST || 'localhost',
};
