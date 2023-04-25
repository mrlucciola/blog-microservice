import * as responses from "./responses";
export { responses };
export * from "./responses";
import * as events from "./events";
export { events };
export * from "./events";

export type ServiceNames =
  | "comments"
  | "event-bus"
  | "moderation"
  | "posts"
  | "query";
type CommentStatus = "pending" | "rejected" | "approved";
export class Comment {
  id: string;
  text: string;
  postId: string;
  status: CommentStatus;

  constructor(
    commentId: string,
    text: string,
    postId: string,
    status: CommentStatus = "pending"
  ) {
    this.id = commentId;
    this.text = text;
    this.postId = postId;
    this.status = status;
  }

  updateStatus = (newStatus: CommentStatus) => {
    this.status = newStatus;
  };
}

export class Post {
  id: string;
  title: string;
  comments: Comment[];

  constructor(postId: string, title: string, comments: Comment[] = []) {
    this.id = postId;
    this.title = title;
    this.comments = comments;
  }
}

// type Environments = "local" | "dev" | "prod";

// class EnvConst<T extends number | string> {
//   public environment: Environments;
//   valLocal: T;
//   valDev: T;
//   valProd: T;

//   constructor(
//     values: { local: T; dev?: T; prod?: T },
//     environment?: Environments
//   ) {
//     this.valLocal = values.local;
//     this.valDev = values.dev || values.local;
//     this.valProd = values.prod || values.dev || values.local;
//     this.environment = environment || "local";
//   }
//   get local() {
//     return this.valLocal;
//   }
//   get dev() {
//     return this.valDev;
//   }
//   get prod() {
//     return this.valProd;
//   }
// }
