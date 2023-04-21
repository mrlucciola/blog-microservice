import { Comment, EventType } from "@blog/common/src/interfaces";

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

export class EventPostCreated extends EventType<Post> {}
