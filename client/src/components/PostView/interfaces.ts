import { Comment } from "../comments/interfaces";

export type PostIdKey = string;

export interface Post {
  id: PostIdKey;
  title: string;
  comments: Comment[];
}

export interface PostListRes {
  [key: string]: Post;
}
