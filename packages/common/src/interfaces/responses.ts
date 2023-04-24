import { Post } from ".";

export interface ResPostList {
  [key: string]: Post;
}

export class ResPostCreated {
  type: string;
  data: Post;

  constructor(type: string, data: Post) {
    this.type = type;
    this.data = data;
  }
}
