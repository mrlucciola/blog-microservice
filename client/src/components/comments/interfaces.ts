import { PostIdKey } from "../PostView/interfaces";

export class Comment {
  id: string;
  text: string;
  postId: string;
  constructor(id: string, text: string, postId: PostIdKey) {
    this.id = id;
    this.text = text;
    this.postId = postId;
  }
}
export class CommentsByPost {
  [key: PostIdKey]: Comment[];
  constructor() {}
}
export const comments: { [key in PostIdKey]?: Comment[] } = {
  asdf: [
    new Comment("81hd9", " test comment1", "asdf"),
    new Comment("1ji9f", "another comment on asdf", "asdf"),
  ],
  cc9012j8: [
    new Comment("lm10d89", " this is a comment", "cc9012j8"),
    new Comment("c09uc98", " this is a comment", "cc9012j8"),
  ],
};
