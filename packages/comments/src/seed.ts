import { Comment } from "@blog/common/src/interfaces";

interface CommentsByPost {
  [key: string]: Comment[];
}
export type CommentsMap = Map<string, Comment>;
export const CommentsMap = Map<string, Comment>;
export const CommentsByPostMap = Map<string, CommentsMap>;
class CommentStore {
  postsMap = new CommentsByPostMap();

  constructor(posts: CommentsByPost) {
    const postKeys = Object.keys(posts);
    const postsArr = postKeys.map((postKey: string) => {
      const commentsInitArr = posts[postKey].map((comment) => {
        return [comment.id, comment] as [string, Comment];
      });
      const commentsMap = new CommentsMap(commentsInitArr);
      return [postKey, commentsMap] as [string, CommentsMap];
    });
    this.postsMap = new CommentsByPostMap(postsArr);
  }

  initNewPostComments = (postId: string) => {
    this.postsMap.set(postId, new CommentsMap());
  };
  getPostComments = (postId: string): CommentsMap => {
    const commentsForPost = this.postsMap.get(postId);

    if (commentsForPost) return commentsForPost;
    else throw new Error(`Comments not init for post: ${postId}`);
  };
  getComment = ({
    postId,
    commentId,
    id,
  }: {
    postId: string;
    commentId?: string;
    id?: string;
  }): Comment => {
    if (commentId && id && commentId !== id)
      throw new Error("No comment ID provided.");
    if (!commentId && !id) throw new Error("Comment IDs don't match.");

    const commentLookupId = (commentId || id)!;
    const commentsForPost = this.getPostComments(postId);
    const comment = commentsForPost.get(commentLookupId);

    if (comment) return comment;
    else throw new Error(`Comments not init for post: ${postId}`);
  };
  pushComment = (newComment: Comment) => {
    const { id, postId } = newComment;
    const commentsForPost = this.getPostComments(postId);
    // add the comment
    commentsForPost?.set(id, newComment);
  };
  updateComment = (updatedComment: Comment) => {
    const { id, postId } = updatedComment;
    const commentsForPost = this.getPostComments(postId);
    // set the comment
    commentsForPost.set(id, updatedComment);
  };
}
export const comments: CommentStore = new CommentStore({
  asdf: [
    new Comment("81hd9", "test comment1", "asdf"),
    new Comment("1ji9f", "another comment on asdf", "asdf"),
  ],
  cc9012j8: [
    new Comment("lm10d89", "this is a comment", "cc9012j8"),
    new Comment("c09uc98", "this is a comment", "cc9012j8"),
  ],
});
