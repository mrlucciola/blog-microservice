import axios from "axios";
// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
// models
import { PostListProps, PostProps } from "../../components/PostView/PostList";
import { PORT_QUERY } from "../../constants";
import { PostIdKey } from "../../components/PostView/interfaces";

export const PostsMap = Map<PostIdKey, PostProps>;
/// Posts store
export class PostsStore {
  // ctor
  constructor(_rootStore: RootStore) {
    // this.other = rootStore.other
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  posts: PostProps[] = [];
  postsMap = new PostsMap();
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get postIds(): PostIdKey[] {
    const postIdArr: PostIdKey[] = [];
    this.postsMap.forEach((post) => {});
    const postsIter = this.postsMap.keys();
    for (let idx = 0; idx < this.postsMap.size; idx++) {
      const postId = postsIter.next().value;
      postIdArr.push(postId);
    }
    return postIdArr;
  }
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  setPosts = (newPostsArr: PostProps[]) => {
    this.posts = newPostsArr;
    this.postsMap = new PostsMap(newPostsArr.map((post) => [post.id, post]));
  };
  postsPush = (newPost: PostProps) => {
    this.posts.push(newPost);
    this.postsMap.set(newPost.id, newPost);
  };
  postsRemoveOne = (postToRemove: PostProps) => {
    this.posts = this.posts.filter((post) => {
      return post.id !== postToRemove.id;
    });
    this.postsMap.delete(postToRemove.id);
  };
  postsFetch = async () => {
    const res = await axios.get<PostListProps>(
      `http://localhost:${PORT_QUERY}/posts`
    );
    if (res.data) this.setPosts(Object.values(res.data));
  };
  getPostById = (postId: PostIdKey): PostProps => {
    return this.postsMap.get(postId)!;
  };
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
