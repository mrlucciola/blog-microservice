// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";

enum AlertEnum {
  success = "success",
  info = "info",
  warn = "warn",
  error = "error",
}

export class BaseAlert<T extends AlertEnum> {
  message: string;
  display = false;
  readonly kind: T;

  constructor(message: string, kind: T) {
    this.message = message;
    this.kind = kind;
  }
  activate() {
    this.display = true;
  }
}

export class Success extends BaseAlert<AlertEnum.success> {
  constructor(msg: string) {
    super(msg, AlertEnum.success);
  }
}
export class Info extends BaseAlert<AlertEnum.info> {
  constructor(msg: string) {
    super(msg, AlertEnum.info);
  }
}
export class Warn extends BaseAlert<AlertEnum.warn> {
  constructor(msg: string) {
    super(msg, AlertEnum.warn);
  }
}
export class Error extends BaseAlert<AlertEnum.error> {
  constructor(msg: string) {
    super(msg, AlertEnum.error);
  }
}

interface Alert extends BaseAlert<AlertEnum> {}

// const asdf: Success = { message: "asdf", display: false, kind: "success" };
const asdf2 = new Success("asdf");
/// Alerts store
export class AlertsStore {
  constructor(_rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  alerts: Alert[] = [];
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get current(): Alert | null {
    if (this.alerts.length === 0) return null;
    return this.alerts[this.alerts.length - 1];
  }
  get queueLen(): number {
    return this.alerts.length;
  }
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  push = (alert: Alert) => {
    this.alerts.push(alert);
  };
  dequeue = () => {
    this.alerts.shift();
  };
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
