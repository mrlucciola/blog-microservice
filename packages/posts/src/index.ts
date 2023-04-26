import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT_POSTS } from "@blog/common/src/constants";
import { ServiceNames } from "@blog/common/src/interfaces";
// local
import routes from "./routes";

export const serviceName: ServiceNames = "posts";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// base
app.use("/", routes);

// start server
app.listen(PORT_POSTS, () => {
  console.log(`"Posts" Server listening at http://localhost:${PORT_POSTS}`);
});
