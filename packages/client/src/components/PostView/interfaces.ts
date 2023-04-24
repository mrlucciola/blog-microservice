import { Post } from "@blog/common/src/interfaces";

export interface PostCreateRes {
  id: string;
  title: string;
}

export interface PostListRes {
  [key: string]: Post;
}
