import axios from "axios";
// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
// models
import { Comment, CommentsByPost } from "../../components/comments/interfaces";
import { PostIdKey } from "../../components/PostView/interfaces";

const fetchCommments = async (store: CommentsStore, postId: PostIdKey) => {
  try {
    const res = await axios.get<Comment[]>(
      `http://localhost:8081/posts/${postId}/comments`
    );
    if (res.data) store.setCommentsByPost(postId, res.data);
  } catch (err) {
    throw new Error(`Error requesting comments for post ${postId}:\n${err}`);
  }
};

/// Main
export class CommentsStore {
  // ctor
  constructor(_rootStore: RootStore) {
    // this.other = rootStore.other
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  commentsByPost = {} as CommentsByPost;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////

  // comments
  setCommentsByPost = (postId: PostIdKey, comments: Comment[]) => {
    this.commentsByPost[postId] = comments;
  };
  commentsByPostPush = (postId: PostIdKey, comment: Comment) => {
    this.commentsByPost[postId].push(comment);
  };
  /** Fetch the comments for multiple posts in a single query */
  commentsByPostFetch = (postIds: PostIdKey[]) => {
    // let this run async
    postIds.forEach((postId) => fetchCommments(this, postId));
  };
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
