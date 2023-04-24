import { Comment, Post } from ".";

export type EventNames = "PostCreated" | "CommentCreated";

export class EventMsg<D extends object> {
  type: string;
  data: D;

  constructor(type: string, data: D) {
    this.type = type;
    this.data = data;
  }
}

export class EventCommentCreated extends EventMsg<Comment> {}
export class EventPostCreated extends EventMsg<Post> {}
