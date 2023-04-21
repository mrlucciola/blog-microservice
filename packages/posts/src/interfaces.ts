import { Post } from "@blog/common/src/interfaces";

/** Request to Event service of type `NewPost`
 */
export class ReqEventPostCreated {
  type: string;
  data: Post;

  constructor(type: string, data: Post) {
    this.type = type;
    this.data = data;
  }
}
export class ResEventPostCreated {
  type: string;
  data: Post;

  constructor(type: string, data: Post) {
    this.type = type;
    this.data = data;
  }
}

// type Environments = "local" | "dev" | "prod";

// class EnvConst<T extends number | string> {
//   public environment: Environments;
//   valLocal: T;
//   valDev: T;
//   valProd: T;

//   constructor(
//     values: { local: T; dev?: T; prod?: T },
//     environment?: Environments
//   ) {
//     this.valLocal = values.local;
//     this.valDev = values.dev || values.local;
//     this.valProd = values.prod || values.dev || values.local;
//     this.environment = environment || "local";
//   }
//   get local() {
//     return this.valLocal;
//   }
//   get dev() {
//     return this.valDev;
//   }
//   get prod() {
//     return this.valProd;
//   }
// }
