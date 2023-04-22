import * as requests from "./requests";
export { requests };

export type PostIdKey = string;
export type CommentIdKey = string;

export class Comment {
  id: CommentIdKey;
  text: string;
  postId: PostIdKey;

  constructor(id: CommentIdKey, text: string, postId: PostIdKey) {
    this.id = id;
    this.text = text;
    this.postId = postId;
  }
}
export class Post {
  id: PostIdKey;
  title: string;
  comments: Comment[];

  constructor(id: PostIdKey, title: string, comments: Comment[]) {
    this.id = id;
    this.title = title;
    this.comments = comments;
  }
}

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
