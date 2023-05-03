import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
// common
import { HOSTNAMES, PORTS } from "@blog/constants";
import { EventMsg, ServiceNames } from "@blog/interfaces";
import { addRoutes } from "@blog/utils";
// local
import { PostsStore } from "./store";
import { handleEvent } from "./utils";

export const serviceName: ServiceNames = "query";

// init
const app = express();
export const posts = new PostsStore();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// set routes
app.use("/", addRoutes());

// start server
app.listen(PORTS.query, async () => {
  console.log(
    `"Query" Server listening at\ninternal:${HOSTNAMES.query.internal}:${PORTS.query}\nexternal:${HOSTNAMES.query.external}`
  );

  const res = await axios.get<EventMsg[]>(
    `${HOSTNAMES.eventBus.internal}:${PORTS.eventBus}/events`
  );

  res.data.forEach((event) => {
    // @todo add validation
    handleEvent(event);
  });
});
