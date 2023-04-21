import { Comment } from "@blog/common/src/interfaces";
import { Post } from "./interfaces";

export const posts: { [key: string]: Post } = {
  asdf: new Post("asdf", "test post 1 asdf", [
    new Comment("81hd9", "test comment1", "asdf"),
    new Comment("1ji9f", "another comment on asdf", "asdf"),
  ]),
  cc9012j8: new Post("cc9012j8", "test post 2 cc9012j8", [
    new Comment("lm10d89", "this is a comment", "cc9012j8"),
    new Comment("c09uc98", "this is a comment", "cc9012j8"),
  ]),
};
