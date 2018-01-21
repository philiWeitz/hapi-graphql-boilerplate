
const _ = require('lodash');

const config = {

  NODE_ENV: process.env.NODE_ENV || 'development',

  // Server configuration
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 8080,
  CORS_ENABLED: process.env.CORS_ENABLED || true,

  // Knex configuration
  KNEX_HOST: process.env.KNEX_HOST || 'db',
  KNEX_DATABASE: process.env.KNEX_DATABASE || 'postgres',
  KNEX_DATABASE_TEST: process.env.KNEX_DATABASE_TEST || 'postgres_test',
  KNEX_USER: process.env.KNEX_USER || 'postgres',
  KNEX_PASSWORD: process.env.KNEX_PASSWORD || 'postgres',

  // GraphQL configuration
  GRAPH_QL_MAX_DEPTH: _.parseInt(process.env.GRAPH_QL_MAX_DEPTH) || 10,
};

module.exports = config;
