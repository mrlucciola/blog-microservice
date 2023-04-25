import { Comment, CommentStatus, Post } from "@blog/common/src/interfaces";

export type PostsMap = Map<string, Post>;
export const PostsMap = Map<string, Post>;
export class PostsStore {
  values: { [key: string]: Post } = {};
  // postsMap: PostsMap;

  constructor() {
    // create map
    // this.postsMap = new PostsMap(posts);
  }

  getCommentsForPost = (postId: string): Comment[] => {
    if (this.values[postId]) {
      return this.values[postId].comments;
    } else throw new Error(`Post id "${postId}" not in store.`);
  };
  getComment = ({
    postId,
    id: commentId,
  }: { postId: string; id: string } | Comment): Comment => {
    const comment = this.getCommentsForPost(postId).find((comment) => {
      return comment.id === commentId;
    });

    if (!comment) throw new Error(`Comment ID "${commentId}" not found`);

    return comment;
  };
  updateCommentStatus = (
    newComment: { postId: string; id: string; status: CommentStatus } | Comment
  ) => {
    const commentToUpdate = this.getComment({
      id: newComment.id,
      postId: newComment.postId,
    });
    commentToUpdate.status = newComment.status;
  };
}
