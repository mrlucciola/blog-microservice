import express, { Response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {
  PORT_COMMENTS,
  PORT_EVENT_BUS,
  PORT_MODERATION,
  PORT_POSTS,
  PORT_QUERY,
} from "@blog/common/src/constants";
import { EventMsg, EventReq, ServiceNames } from "@blog/common/src/interfaces";
import { EventsStore, events } from "./seed";

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
app
  .route("/events")
  .get((_req, res: Response<EventMsg[]>, _next) => {
    res.status(200).send(events.values);
  })
  .post((req: EventReq, res, _next) => {
    const event = req.body;
    console.log(`incoming event: ${event.eventName}\n`, event.data);
    events.values.push(event);

    // send requests
    axios.post(`http://localhost:${PORT_POSTS}/events`, event);
    axios.post(`http://localhost:${PORT_COMMENTS}/events`, event);
    axios.post(`http://localhost:${PORT_MODERATION}/events`, event);
    axios.post(`http://localhost:${PORT_QUERY}/events`, event);

    res.send({ status: "OK" });
  });

// start server
app.listen(PORT_EVENT_BUS, () => {
  console.log(`Server listening at http://localhost:${PORT_EVENT_BUS}`);
});
