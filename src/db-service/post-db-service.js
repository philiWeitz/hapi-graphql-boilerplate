
import createDbService from './create-db-service';
import PostModel from '../model/PostModel';

const postDbService = createDbService(PostModel, {

  getByAuthorId(authorId) {
    return PostModel.query().where('author_id', authorId);
  },

});

export default postDbService;
