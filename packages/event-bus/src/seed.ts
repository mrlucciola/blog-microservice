import {
  Comment,
  EventCommentCreated,
  EventCommentModerated,
  EventCommentUpdated,
  EventPostCreated,
  Post,
} from "@blog/interfaces";

export const seedEvents = [
  new EventPostCreated({ id: "6a8c9585", title: "First post", comments: [] }),
  new EventCommentCreated({
    id: "3e5552d6",
    text: "adding comment",
    postId: "6a8c9585",
    status: "pending",
  } as Comment),
  new EventCommentModerated({
    id: "3e5552d6",
    text: "adding comment",
    postId: "6a8c9585",
    status: "approved",
  } as Comment),
  new EventCommentUpdated({
    id: "3e5552d6",
    text: "adding comment",
    postId: "6a8c9585",
    status: "approved",
  } as Comment),
  ///////////
  new EventPostCreated({
    id: "f52ee43a",
    title: "second test post",
    comments: [],
  } as Post),
  new EventCommentCreated({
    id: "ce623eed",
    text: "orange",
    postId: "f52ee43a",
    status: "pending",
  } as Comment),
  new EventCommentModerated({
    id: "ce623eed",
    text: "orange",
    postId: "f52ee43a",
    status: "rejected",
  } as Comment),
  new EventCommentUpdated({
    id: "ce623eed",
    text: "orange",
    postId: "f52ee43a",
    status: "rejected",
  } as Comment),
  new EventCommentCreated({
    id: "c95ea315",
    text: "approved",
    postId: "f52ee43a",
    status: "pending",
  } as Comment),
  new EventCommentModerated({
    id: "c95ea315",
    text: "approved",
    postId: "f52ee43a",
    status: "approved",
  } as Comment),
  new EventCommentUpdated({
    id: "c95ea315",
    text: "approved",
    postId: "f52ee43a",
    status: "approved",
  } as Comment),
];
