import { Comment, Post } from ".";

export class EventType<D extends object> {
  type: string;
  data: D;

  constructor(type: string, data: D) {
    this.type = type;
    this.data = data;
  }
}

export class EventCommentCreated extends EventType<Comment> {}
export class EventPostCreated extends EventType<Post> {}
