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
export type PostIdKey = string;
