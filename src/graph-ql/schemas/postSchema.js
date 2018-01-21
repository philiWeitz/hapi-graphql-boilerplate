
import postCore from '../../core/post-core';
import authorCore from '../../core/author-core';


const PostType = `
  # Description for Post type
  type Post {
    id: Int!
    
    # Title of the post
    title: String
    
    # Author of the post
    author: AuthorBase
    
    # Amount of votes for the specific post
    votes: Int
  }
`;

const PostQuery = `
  # Get all posts
  posts: [Post]
  @authenticated(roles: ["admin"])
`;

const PostMutation = `
  upvotePost (postId: Int!): Post
  @authenticated(roles: ["admin"])   
`;


const PostResolver = {
  Query: {
    posts: postCore.getPosts,
  },
  Mutation: {
    upvotePost: (root, { postId }) => postCore.upvotePost(postId),
  },
  Post: {
    author: (post) => authorCore.getAuthor(post.authorId),
  },
};


export default {
  type: PostType,
  query: PostQuery,
  mutation: PostMutation,
  resolver: PostResolver,
};
