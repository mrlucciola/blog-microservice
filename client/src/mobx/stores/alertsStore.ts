// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
import { AlertColor } from "@mui/material";

export class BaseAlert<T extends AlertColor> {
  kind: T;
  message: string;
  display = false;

  constructor(kind: T, message: string) {
    this.kind = kind;
    this.message = message;
  }
}

export class SuccessAlert extends BaseAlert<"success"> {
  constructor(msg: string) {
    super("success", msg);
  }
}
export class InfoAlert extends BaseAlert<"info"> {
  constructor(msg: string) {
    super("info", msg);
  }
}
export class WarningAlert extends BaseAlert<"warning"> {
  constructor(msg: string) {
    super("warning", msg);
  }
}
export class ErrorAlert extends BaseAlert<"error"> {
  constructor(msg: string) {
    super("error", msg);
  }
}

export class Alert extends BaseAlert<AlertColor> {}

/// Alerts store
export class AlertsStore {
  constructor(_rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /////////////////////////////////////////////////////////
  ////////////////////// OBSERVABLES //////////////////////
  // alerts: Alert[] = [];
  current: Alert | null = null;
  ////////////////////// OBSERVABLES //////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  /////////////////////// COMPUTEDS ///////////////////////
  get isActive(): boolean {
    return this.current !== null;
  }
  /////////////////////// COMPUTEDS ///////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// ACTIONS ////////////////////////
  activateAlert(kind: AlertColor, msg: string) {
    const newAlert = new BaseAlert<AlertColor>(kind, msg);

    this.current = newAlert;
  }
  deactivateAlert = () => {
    this.current = null;
  };
  //////////////////////// ACTIONS ////////////////////////
  /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////
  //////////////////////// HELPERS ////////////////////////
  //////////////////////// HELPERS ////////////////////////
  /////////////////////////////////////////////////////////
}
