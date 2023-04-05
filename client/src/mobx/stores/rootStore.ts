import { MainStore } from "./mainStore";
import { CommentsStore } from "./commentsStore";

export class RootStore {
  main: MainStore;
  comments: CommentsStore;

  constructor() {
    this.main = new MainStore(this);
    this.comments = new CommentsStore(this);
  }
}
