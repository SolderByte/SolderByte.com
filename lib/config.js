var config = {};

config.logging = {
  enabled: process.env.LOG || true,
  error: true,
  info: true,
  debug: true
};

config.httpPort = 8080;

module.exports = config;
