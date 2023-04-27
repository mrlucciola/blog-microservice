import { EventMsg } from "@blog/interfaces";

export class EventsStore {
  values: EventMsg[];

  constructor(events: EventMsg[]) {
    this.values = events;
  }
}
