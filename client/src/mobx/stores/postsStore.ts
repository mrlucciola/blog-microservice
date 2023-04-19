import axios from "axios";
// state
import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
// models
import {
  PostIdKey,
  Post,
  PostListRes,
} from "../../components/PostView/interfaces";
import { PORT_QUERY } from "../../constants";

export const PostsMap = Map<PostIdKey, Post>;

/// Posts store
export class PostsStore {
  constructor(_rootStore: RootStore) {
    // this.other = rootStore.other
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  postsMap = new PostsMap();
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get postIds(): PostIdKey[] {
    const postIdArr: PostIdKey[] = [];
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
  setPosts = (newPostsArr: Post[]) => {
    this.postsMap = new PostsMap(newPostsArr.map((post) => [post.id, post]));
  };
  postsPush = (newPost: Post) => {
    this.postsMap.set(newPost.id, newPost);
  };
  /**
   * @todo add logic to handle empty response
   * @todo add logic to handle request error
   */
  postsFetch = async () => {
    const res = await axios.get<PostListRes>(
      `http://localhost:${PORT_QUERY}/posts`
    );
    if (res.data) this.setPosts(Object.values(res.data));
  };
  getPostById = (postId: PostIdKey): Post => {
    return this.postsMap.get(postId)!;
  };
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
