const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const config = parse(env('DATABASE_URL') || '');

  const connection = {
    host: env('DATABASE_HOST'),
    port: env.int('DATABASE_PORT'),
    database: env('DATABASE_NAME'),
    user: config.user || env('DATABASE_USERNAME'),
    password: config.password || env('DATABASE_PASSWORD'),
    ssl: env.bool('DATABASE_SSL', false)
      ? {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
        }
      : false,
  };

  return {
    connection: {
      client: 'postgres',
      connection,
    },
  };
};
