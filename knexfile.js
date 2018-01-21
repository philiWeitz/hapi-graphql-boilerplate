
const config = require('./src/config');

const connection = {
  host: config.KNEX_HOST,
  database: config.KNEX_DATABASE,
  user: config.KNEX_USER,
  password: config.KNEX_PASSWORD,
  charset: 'utf8',
};

const settings = {
  client: 'pg',
  connection,
  pool: {
    // Acquiring connection from the connection pool should fail after 15 seconds.
    requestTimeout: (15 * 1000),
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const connections = {
  development: Object.assign({}, settings, { debug: false }),
};

module.exports = connections;
