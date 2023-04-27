import { Request } from "express";
import { Comment, Post } from "./main";

export type EventNames =
  | "PostCreated"
  | "CommentCreated"
  | "CommentModerated"
  | "CommentUpdated";

export type DataTypes = Post | Comment;

export class EventMsg<D extends DataTypes = DataTypes> {
  eventName: EventNames;
  data: D;

  constructor(eventName: EventNames, data: D) {
    this.eventName = eventName;
    this.data = data;
  }
}

export type EventReq = Request<null, object, EventMsg>;

export class EventCommentCreated extends EventMsg<Comment> {
  eventName: EventNames = "CommentCreated";
  constructor(data: Comment) {
    super("CommentCreated", data);
  }
}
export class EventCommentModerated extends EventMsg<Comment> {
  eventName: EventNames = "CommentModerated";
  constructor(data: Comment) {
    super("CommentModerated", data);
  }
}
export class EventCommentUpdated extends EventMsg<Comment> {
  eventName: EventNames = "CommentUpdated";
  constructor(data: { postId: string; id: string; status: string } | Comment) {
    super("CommentUpdated", data as Comment);
  }
}
export class EventPostCreated extends EventMsg<Post> {
  eventName: EventNames = "PostCreated";
  constructor(data: Post) {
    super("PostCreated", data);
  }
}
