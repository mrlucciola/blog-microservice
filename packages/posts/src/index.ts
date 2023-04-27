import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// common
import { PORT_POSTS } from "@blog/constants";
import { ServiceNames } from "@blog/interfaces";
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
