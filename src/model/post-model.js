
const createModel = require('./create-model');

const PostModel = createModel({
  tableName: 'post',
  jsonSchema: {
    type: 'object',
    required: ['title', 'votes'],
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      votes: { type: 'integer' },
      authorId: { type: 'integer' },
      createdAt: { type: 'date-time' },
    },
  },
  timestamps: true,
});

export default PostModel;
