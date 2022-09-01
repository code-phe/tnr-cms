const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const config = parse(env('DATABASE_URL') || '');

  const connection = {
    host: config.host || env('DATABASE_HOST', '127.0.0.1'),
    port: config.port || env.int('DATABASE_PORT', 2345),
    database: config.database || env('DATABASE_NAME', 'strapi'),
    user: config.user || env('DATABASE_USERNAME', 'strapi'),
    password: config.password || env('DATABASE_PASSWORD', 'strapi_admin'),
    ssl: config.host ? {
      rejectUnauthorized: false,
    } : env.bool('DATABASE_SSL', false),
  }

  return {
    connection: {
      client: 'postgres',
      connection,
    },
  };
};
