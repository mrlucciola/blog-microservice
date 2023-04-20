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
export const PORT_POSTS = 8080;
export const PORT_COMMENTS = 8081;
export const PORT_QUERY = 8082;
export const PORT_EVENT_BUS = 8085;
