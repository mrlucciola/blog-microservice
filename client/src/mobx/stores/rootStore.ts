import { MainStore } from "./mainStore";

export class RootStore {
  main: MainStore;

  constructor() {
    this.main = new MainStore(this);
  }
}
