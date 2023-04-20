// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
import { PostsStore } from "./postsStore";
// interfaces
import {
  CommentIdKey,
  Comment,
} from "../../components/CommentSection/interfaces";
import { PostIdKey } from "../../components/PostView/interfaces";

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

  getCommentIds(postId: PostIdKey): CommentIdKey[] {
    const commentIdArr = this.getCommentsByPost(postId).map((c) => c.id);

    return commentIdArr;
  }

  getCommentsByPost = (postId: PostIdKey): Comment[] => {
    const post = this.posts.getPostById(postId);

    return post.comments;
  };

  getComment = (postId: PostIdKey, commentId: CommentIdKey): Comment => {
    const comments = this.getCommentsByPost(postId);
    const comment = comments.find((c) => c.id === commentId)!;

    return comment;
  };

  setCommentsByPost = (postId: PostIdKey, comments: Comment[]) => {
    const post = this.posts.getPostById(postId);

    post.comments = comments;
  };

  pushComment = (postId: PostIdKey, comment: Comment) => {
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
