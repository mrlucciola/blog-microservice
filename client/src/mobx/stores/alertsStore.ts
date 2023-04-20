// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
import { AlertColor } from "@mui/material";

export class BaseAlert<T extends AlertColor> {
  message: string;
  display = false;
  kind: T;

  constructor(message: string, kind: T) {
    this.message = message;
    this.kind = kind;
  }
}

export class SuccessAlert extends BaseAlert<"success"> {
  constructor(msg: string) {
    super(msg, "success");
  }
}
export class InfoAlert extends BaseAlert<"info"> {
  constructor(msg: string) {
    super(msg, "info");
  }
}
export class WarningAlert extends BaseAlert<"warning"> {
  constructor(msg: string) {
    super(msg, "warning");
  }
}
export class ErrorAlert extends BaseAlert<"error"> {
  constructor(msg: string) {
    super(msg, "error");
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
  activateAlert = (alert: Alert) => {
    this.current = alert;
  };
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
