import { Comment, Post } from ".";

export type EventNames = "PostCreated" | "CommentCreated";

export class EventMsg<D extends object> {
  type: EventNames;
  data: D;

  constructor(type: EventNames, data: D) {
    this.type = type;
    this.data = data;
  }
}

export class EventCommentCreated extends EventMsg<Comment> {
  constructor(data: Comment) {
    super("CommentCreated", data);
  }
}
export class EventPostCreated extends EventMsg<Post> {
  constructor(data: Post) {
    super("PostCreated", data);
  }
}

// export class EventPostCreated extends EventMsg<Post> {}
