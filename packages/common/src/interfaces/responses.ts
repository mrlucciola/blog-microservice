import { Post } from ".";

export interface ResEventPostList {
  [key: string]: Post;
}

export class ResEventPostCreated {
  type: string;
  data: Post;

  constructor(type: string, data: Post) {
    this.type = type;
    this.data = data;
  }
}
