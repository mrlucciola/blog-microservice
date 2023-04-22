import { PostIdKey, Post } from "@blog/common/src/interfaces";

export interface PostCreateRes {
  id: PostIdKey;
  title: string;
}

export interface PostListRes {
  [key: string]: Post;
}
