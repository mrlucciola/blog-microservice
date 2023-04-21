import { Comment, Post } from ".";

/** Request to Event service of type `NewPost`
 */
export class ReqEventPostCreated {
  type: string;
  data: Post;

  constructor(type: string, data: Post) {
    this.type = type;
    this.data = data;
  }
}
export class ResEventPostCreated {
  type: string;
  data: Post;

  constructor(type: string, data: Post) {
    this.type = type;
    this.data = data;
  }
}

export class ReqEventCommentCreated {
  type: string;
  data: Comment;

  constructor(type: string, data: Comment) {
    this.type = type;
    this.data = data;
  }
}