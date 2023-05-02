import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
// common
import {
  HOST_ADDR_EVENT_BUS,
  HOST_ADDR_QUERY_EXTERNAL,
  HOST_ADDR_QUERY_INTERNAL,
  PORT_QUERY,
} from "@blog/constants";
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
app.listen(PORT_QUERY, async () => {
  console.log(
    `"Query" Server listening at ${HOST_ADDR_QUERY_INTERNAL} & ${HOST_ADDR_QUERY_EXTERNAL}`
  );

  const res = await axios.get<EventMsg[]>(`${HOST_ADDR_EVENT_BUS}/events`);

  res.data.forEach((event) => {
    // @todo add validation
    handleEvent(event);
  });
});
