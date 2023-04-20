// state
import { makeAutoObservable } from "mobx";
// stores
import { RootStore } from "./rootStore";
import { AlertColor } from "@mui/material";

enum AlertEnum {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

export class BaseAlert<T extends AlertColor> {
  message: string;
  display = false;
  kind: T;

  constructor(message: string, kind: T) {
    this.message = message;
    this.kind = kind;
  }
}

export class SuccessAlert extends BaseAlert<AlertEnum.success> {
  constructor(msg: string) {
    super(msg, AlertEnum.success);
  }
}
export class InfoAlert extends BaseAlert<AlertEnum.info> {
  constructor(msg: string) {
    super(msg, AlertEnum.info);
  }
}
export class WarningAlert extends BaseAlert<AlertEnum.warning> {
  constructor(msg: string) {
    super(msg, AlertEnum.warning);
  }
}
export class ErrorAlert extends BaseAlert<AlertEnum.error> {
  constructor(msg: string) {
    super(msg, AlertEnum.error);
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
