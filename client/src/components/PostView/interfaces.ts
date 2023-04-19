import { Comment } from "../comments/interfaces";

export type PostIdKey = string;

export class Post {
  id: PostIdKey;
  title: string;
  comments: Comment[];

  constructor(id: PostIdKey, title: string, comments: Comment[]) {
    this.id = id;
    this.title = title;
    this.comments = comments;
  }
}

export interface PostCreateRes {
  id: PostIdKey;
  title: string;
}

export interface PostListRes {
  [key: string]: Post;
}
