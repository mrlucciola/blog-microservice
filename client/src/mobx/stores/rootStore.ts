import { MainStore } from "./mainStore";
import { PostsStore } from "./postsStore";
import { CommentsStore } from "./commentsStore";
import { AlertsStore } from "./alertsStore";

export class RootStore {
  main: MainStore;
  posts: PostsStore;
  comments: CommentsStore;
  alerts: AlertsStore;

  constructor() {
    this.main = new MainStore(this);
    this.posts = new PostsStore(this);
    this.comments = new CommentsStore(this);
    this.alerts = new AlertsStore(this);
  }
}
