import axios from "axios";
// state
import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
// common
import { HOST_ADDR_QUERY_EXTERNAL } from "@blog/constants";
import { Post } from "@blog/interfaces";

class ResPostList {}

export const PostsMap = Map<string, Post>;

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
  get postIds(): string[] {
    const postIdArr: string[] = [];
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
    const res = await axios.get<ResPostList>(
      `${HOST_ADDR_QUERY_EXTERNAL}/posts`
    );
    if (res.data) this.setPosts(Object.values(res.data));
  };
  getPostById = (postId: string): Post => {
    return this.postsMap.get(postId)!;
  };
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
