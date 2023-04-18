import { MainStore } from "./mainStore";
import { CommentsStore } from "./commentsStore";
import { PostsStore } from "./postsStore";

export class RootStore {
  main: MainStore;
  posts: PostsStore;
  comments: CommentsStore;

  constructor() {
    this.main = new MainStore(this);
    this.posts = new PostsStore(this);
    this.comments = new CommentsStore(this);
  }
}
