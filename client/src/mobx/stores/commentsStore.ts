import axios from "axios";
// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
// models
import {
  CommentIdKey,
  Comment,
  CommentsByPost,
} from "../../components/comments/interfaces";
import { PostIdKey } from "../../components/PostView/interfaces";
import { PORT_COMMENTS } from "../../constants";
import { PostsStore } from "./postsStore";

// @todo fetch comments from the query service
const fetchCommments = async (store: CommentsStore, postId: PostIdKey) => {
  // try {
  //   const res = await axios.get<Comment[]>(
  //     `http://localhost:${PORT_COMMENTS}/posts/${postId}/comments`
  //   );
  //   if (res.data) store.setCommentsByPost(postId, res.data);
  // } catch (err) {
  //   throw new Error(`Error requesting comments for post ${postId}:\n${err}`);
  // }
};

/// Comments store
export class CommentsStore {
  posts: PostsStore;

  // ctor
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
    // const post = this.posts.getPostById(postId);
    // return post.comments;
    const comments = this.getCommentsByPost(postId);
    const comment = comments.find((c) => c.id === commentId)!;

    return comment;
  };
  // comments
  setCommentsByPost = (postId: PostIdKey, comments: Comment[]) => {
    const post = this.posts.getPostById(postId);
    post.comments = comments;
  };
  commentsByPostPush = (postId: PostIdKey, comment: Comment) => {
    const post = this.posts.getPostById(postId);
    post.comments.push(comment);
  };
  /** Fetch the comments for multiple posts in a single query */
  commentsByPostFetch = (postIds: PostIdKey[]) => {
    // let this run async
    // postIds.forEach((postId) => fetchCommments(this, postId));
  };
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
