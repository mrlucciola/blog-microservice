import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {
  PORT_COMMENTS,
  PORT_EVENT_BUS,
  PORT_MODERATION,
  PORT_POSTS,
  PORT_QUERY,
} from "@blog/common/src/constants";
import { EventReq, ServiceNames } from "@blog/common/src/interfaces";

export const serviceName: ServiceNames = "event-bus";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());

// base route
app.get("/", (_, res) => {
  res.send("Hello from event-bus service!");
});

// additional routes
app.post("/events", (req: EventReq, res, _next) => {
  const event = req.body;
  console.log(`incoming event: ${event.eventName}\n`, event.data);

  // send requests
  axios.post(`http://localhost:${PORT_POSTS}/events`, event);
  axios.post(`http://localhost:${PORT_COMMENTS}/events`, event);
  axios.post(`http://localhost:${PORT_MODERATION}/events`, event);
  axios.post(`http://localhost:${PORT_QUERY}/events`, event);

  return res.send({ status: "OK" });
});

// start server
app.listen(PORT_EVENT_BUS, () => {
  console.log(`Server listening at http://localhost:${PORT_EVENT_BUS}`);
});
