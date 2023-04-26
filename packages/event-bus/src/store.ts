import { EventMsg } from "@blog/common/src/interfaces";

export class EventsStore {
  values: EventMsg[];

  constructor(events: EventMsg[]) {
    this.values = events;
  }
}
