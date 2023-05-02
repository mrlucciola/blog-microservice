import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// common
import { PORT_POSTS, HOSTNAMES } from "@blog/constants";
import { ServiceNames } from "@blog/interfaces";
import { addRoutes } from "@blog/utils";

export const serviceName: ServiceNames = "posts";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// base
app.use("/", addRoutes());

// start server
app.listen(PORT_POSTS, () => {
  console.log(
    `"Posts" Server listening on port ${PORT_POSTS} at:\ninternal: ${HOSTNAMES.posts.internal}\nexternal: ${HOSTNAMES.posts.external}`
  );
});
