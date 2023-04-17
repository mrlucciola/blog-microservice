export type Environments = "local" | "dev" | "prod";

class EnvConst<T extends number | string> {
  public environment: Environments;
  valLocal: T;
  valDev: T;
  valProd: T;

  constructor(
    values: { local: T; dev?: T; prod?: T },
    environment?: Environments
  ) {
    this.valLocal = values.local;
    this.valDev = values.dev || values.local;
    this.valProd = values.prod || values.dev || values.local;
    this.environment = environment || "local";
  }
  get local() {
    return this.valLocal;
  }
  get dev() {
    return this.valDev;
  }
  get prod() {
    return this.valProd;
  }
}

// constants
export const POSTS_PORT = 8080;
export const EVENT_BUS_PORT = 4005;
