
import Hapi from 'hapi';
import Knex from 'knex';
import depthLimit from 'graphql-depth-limit';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';

import config from './config';
import schema from './graph-ql/schema';


// setup objection and knex database connection
const Objection = require('objection');
const knexConfig = require('../knexfile');

const knexSettings = knexConfig[config.NODE_ENV];
const knex = Knex(knexSettings);
Objection.Model.knex(knex);


async function StartServer() {

  // eslint-disable-next-line
  const server = new Hapi.server({
    host: config.HOST,
    port: config.PORT,
    debug: { request: ['error'] },
  });

  // register plugins
  await server.register([
    {
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: request => ({
          schema,
          debug: true,
          tracing: false,
          context: { req: request },
          validationRules: [depthLimit(config.GRAPH_QL_MAX_DEPTH)],
        }),
        route: {
          cors: true,
        },
      },
    },
    {
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql',
        },
      },
    },
  ]);

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
