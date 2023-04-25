import { EventMsg, EventPostCreated, Post } from "@blog/common/src/interfaces";

export class EventsStore {
  values: EventMsg[];

  constructor(events: EventMsg[]) {
    this.values = events;
  }
}

export const events: EventMsg[] = [
  new EventPostCreated(new Post("asdf", "test post 1 asdf")),
  new EventPostCreated(new Post("cc9012j8", "test post 2 cc9012j8")),
];
