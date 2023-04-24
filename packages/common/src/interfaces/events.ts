import { Request } from "express";
import { Comment, Post } from ".";

export type EventNames =
  | "PostCreated"
  | "CommentCreated"
  | "CommentModerated"
  | "CommentUpdated";

export type DataTypes = Post | Comment;
export class EventMsg<D extends DataTypes = DataTypes> {
  type: EventNames;
  data: D;

  constructor(type: EventNames, data: D) {
    this.type = type;
    this.data = data;
  }
}
export type EventReq = Request<null, object, EventMsg>;

export class EventCommentCreated extends EventMsg<Comment> {
  type: EventNames = "CommentCreated";
  constructor(data: Comment) {
    super("CommentCreated", data);
  }
}
export class EventCommentModerated extends EventMsg<Comment> {
  type: EventNames = "CommentModerated";
  constructor(data: Comment) {
    super("CommentModerated", data);
  }
}
export class EventCommentUpdated extends EventMsg<Comment> {
  type: EventNames = "CommentUpdated";
  constructor(data: Comment) {
    super("CommentUpdated", data);
  }
}
export class EventPostCreated extends EventMsg<Post> {
  type: EventNames = "PostCreated";
  constructor(data: Post) {
    super("PostCreated", data);
  }
}
