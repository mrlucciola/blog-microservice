import { Comment, Post } from "@blog/common/src/interfaces";

export type PostsMap = Map<string, Post>;
export const PostsMap = Map<string, Post>;
export class PostsStore {
  values: { [key: string]: Post };
  // postsMap: PostsMap;

  constructor(posts: { [key: string]: Post }) {
    this.values = posts;

    // create map
    // this.postsMap = new PostsMap(posts);
  }

  getCommentsForPost = (postId: string): Comment[] => {
    if (this.values[postId]) {
      return this.values[postId].comments;
    } else throw new Error(`Post id "${postId}" not in store.`);
  };
  getComment = ({ postId, id: commentId }: Comment): Comment => {
    const comment = this.getCommentsForPost(postId).find((comment) => {
      return comment.id === commentId;
    });

    if (!comment) throw new Error(`Comment ID "${commentId}" not found`);

    return comment;
  };
  updateCommentStatus = (newComment: Comment) => {
    const commentToUpdate = this.getComment(newComment);
    commentToUpdate.status = newComment.status;
  };
}

export const posts = new PostsStore({
  asdf: new Post("asdf", "test post 1 asdf", [
    new Comment("81hd9", "test comment1", "asdf"),
    new Comment("1ji9f", "another comment on asdf", "asdf"),
  ]),
  cc9012j8: new Post("cc9012j8", "test post 2 cc9012j8", [
    new Comment("lm10d89", "this is a comment", "cc9012j8"),
    new Comment("c09uc98", "this is a comment", "cc9012j8"),
  ]),
});
