
// Example Postman Queries
//
// mutation:
//  { "query": "mutation { upvotePost(postId: 1) { id, votes } }" }
//
// get posts:
//  { "query": "{ posts {id, title, votes} }" }
//  { "query": "{ author(id: 1) {id, firstName} }" }


import _ from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import directives from './directives';
import allSchemas from './schemas';


const combine = (schemas, property) => {
  return schemas.map(schema => {
    return schema[property] ? schema[property] : '';
  }).reduce((res, value) => {
    return `${res}${value}`;
  }, '');
};

const combineType = schemas => combine(schemas, 'type');
const combineQuery = schemas => combine(schemas, 'query');
const combineMutation = schemas => combine(schemas, 'mutation');


const typeDefs = `
  ${directives.schema}
  ${combineType(allSchemas)}
  
  # the schema allows the following query:
  type Query {
    ${combineQuery(allSchemas)}
  }
  
  # this schema allows the following mutation:
  type Mutation {
    ${combineMutation(allSchemas)}
  }
`;

const resolvers = _.merge({}, ...allSchemas.map(schema => schema.resolver));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithCustomDirectives = directives.attachDirectives(schema);

export default schemaWithCustomDirectives;
