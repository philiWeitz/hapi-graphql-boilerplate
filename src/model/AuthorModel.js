
const Objection = require('objection');
const createModel = require('./create-model');

const { Model } = Objection;


const AuthorModel = createModel({
  tableName: 'author',
  jsonSchema: {
    type: 'object',
    required: ['first_name', 'last_name'],
    properties: {
      id: { type: 'integer' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      createdAt: { type: 'date-time' },
    },
  },
  relationMappings: {
    measurements: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/PostModel`,
      join: {
        from: 'author.id',
        to: 'post.author_id',
      },
    },
  },
});

export default AuthorModel;
