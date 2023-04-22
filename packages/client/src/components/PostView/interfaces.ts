import { interfaces } from "@blog/common";
export type PostIdKey = interfaces.PostIdKey;
export class Post extends interfaces.Post {}

export interface PostCreateRes {
  id: PostIdKey;
  title: string;
}

export interface PostListRes {
  [key: string]: Post;
}
