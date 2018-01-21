
import postDbService from '../db-service/post-db-service';

const postCore = {

  getPosts() {
    return postDbService.getAll();
  },

  getPostsByAuthor(authorId) {
    return postDbService.getByAuthorId(authorId);
  },

  async upvotePost(postId) {
    const post = await postDbService.getById(postId);
    if (post) {
      return postDbService.patchAndFetchById(postId, { votes: (post.votes + 1) });
    }
    return null;
  },
};

export default postCore;
