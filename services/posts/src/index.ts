import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// common
import { PORT_POSTS, HOST_ADDR_POSTS } from "@blog/constants";
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
  console.log(`"Posts" Server listening at ${HOST_ADDR_POSTS}`);
});
