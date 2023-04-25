import {
  Comment,
  EventCommentCreated,
  EventCommentModerated,
  EventCommentUpdated,
  EventMsg,
  EventPostCreated,
  Post,
} from "@blog/common/src/interfaces";

export class EventsStore {
  values: EventMsg[];

  constructor(events: EventMsg[]) {
    this.values = events;
  }
}

export const events: EventMsg[] = [
  // new EventPostCreated(new Post("asdf", "test post 1 asdf")),
  // new EventPostCreated(new Post("cc9012j8", "test post 2 cc9012j8")),
  // // create comment
  // new EventCommentCreated(new Comment("81hd9", "test comment1", "asdf")),
  // new EventCommentModerated(
  //   new Comment("81hd9", "test comment1", "asdf", "approved")
  // ),
  // new EventCommentUpdated(
  //   new Comment("81hd9", "test comment1", "asdf", "approved")
  // ),
  // // create comment
  // new EventCommentCreated(
  //   new Comment("1ji9f", "another comment on asdf", "asdf")
  // ),
  // new EventCommentModerated(
  //   new Comment("1ji9f", "another comment on asdf", "asdf", "approved")
  // ),
  // new EventCommentUpdated(
  //   new Comment("1ji9f", "another comment on asdf", "asdf", "approved")
  // ),
  // // create comment
  // new EventCommentCreated(
  //   new Comment("lm10d89", "this is a comment", "cc9012j8")
  // ),
  // new EventCommentModerated(
  //   new Comment("lm10d89", "this is a comment", "cc9012j8", "approved")
  // ),
  // new EventCommentUpdated(
  //   new Comment("lm10d89", "this is a comment", "cc9012j8", "approved")
  // ),
  // // create comment
  // new EventCommentCreated(new Comment("c09uc98", "orange", "cc9012j8")),
  // new EventCommentModerated(
  //   new Comment("c09uc98", "orange", "cc9012j8", "rejected")
  // ),
  // new EventCommentUpdated(
  //   new Comment("c09uc98", "orange", "cc9012j8", "rejected")
  // ),
];
