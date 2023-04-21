import { Comment } from "@blog/common/src/interfaces";

export class ReqEventCommentCreated {
  type: string;
  data: Comment;

  constructor(type: string, data: Comment) {
    this.type = type;
    this.data = data;
  }
}
