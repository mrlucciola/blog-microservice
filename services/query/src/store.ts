import { Comment, Post } from "@blog/interfaces";

export type PostsMap = Map<string, Post>;
export const PostsMap = Map<string, Post>;

export class PostsStore {
  values: { [key: string]: Post } = {};
  postsMap = new PostsMap();

  constructor() {}

  getCommentsForPost = (postId: string): Comment[] => {
    if (this.values[postId]) {
      return this.values[postId].comments;
    } else throw new Error(`Post id "${postId}" not in store.`);
  };
  getComments = (postId: string): Comment[] => {
    const post = this.postsMap.get(postId);
    if (post) return post.comments;
    else throw new Error(`Post id "${postId}" not in store.`);
  };
  getComment = ({
    postId,
    id: commentId,
  }: { postId: string; id: string } | Comment): Comment => {
    // const comment = this.getComments(postId).find((comment) => {
    //   return comment.id === commentId;
    // });
    const comment = this.getCommentsForPost(postId).find((comment) => {
      return comment.id === commentId;
    });

    if (!comment) throw new Error(`Comment ID "${commentId}" not found`);

    return comment;
  };
  addPost = (post: Post) => {
    if (this.values[post.id]) throw new Error(`Post "${post.id}" exists`);

    this.values[post.id] = new Post(post.id, post.title, []);
    this.postsMap.set(post.id, post);
  };
  createComment = ({ id: commentId, text, postId, status }: Comment) => {
    const comment = new Comment(commentId, text, postId, status);
    // const comments = this.getComments(comment.postId);
    const comments = this.getCommentsForPost(comment.postId);
    // validation: check if comment doesnt already exist
    // add to store
    comments.push(comment);
  };
  updateComment = (newComment: Comment) => {
    const commentToUpdate = this.getComment({
      id: newComment.id,
      postId: newComment.postId,
    });
    commentToUpdate.status = newComment.status;
    commentToUpdate.text = newComment.text;
  };
}
