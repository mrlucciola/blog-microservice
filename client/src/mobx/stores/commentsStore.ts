// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
import { PostsStore } from "./postsStore";
// common
import { Comment } from "@blog/interfaces";

/// Comments store
export class CommentsStore {
  posts: PostsStore;

  constructor(rootStore: RootStore) {
    this.posts = rootStore.posts;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////

  getCommentIds(postId: string): string[] {
    const commentIdArr = this.getCommentsByPost(postId).map((c) => c.id);

    return commentIdArr;
  }

  getCommentsByPost = (postId: string): Comment[] => {
    const post = this.posts.getPostById(postId);

    return post.comments;
  };

  getComment = (postId: string, commentId: string): Comment => {
    const comments = this.getCommentsByPost(postId);
    const comment = comments.find((c) => c.id === commentId)!;

    return comment;
  };

  setCommentsByPost = (postId: string, comments: Comment[]) => {
    const post = this.posts.getPostById(postId);

    post.comments = comments;
  };

  pushComment = (postId: string, comment: Comment) => {
    const comments = this.getCommentsByPost(postId);

    comments.push(comment);
  };

  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
