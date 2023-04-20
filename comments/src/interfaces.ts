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

export class ReqEventCommentCreated {
  type: string;
  data: Comment;

  constructor(type: string, data: Comment) {
    this.type = type;
    this.data = data;
  }
}

export class Post {
  id: string;
  title: string;
  comments?: Comment[] = [];

  constructor(id: string, title: string, comments?: Comment[]) {
    this.id = id;
    this.title = title;
    this.comments = comments || [];
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

export class EventPostCreated extends EventType<Post> {}
