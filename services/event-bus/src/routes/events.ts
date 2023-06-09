import { Response, Router } from "express";
import axios, { AxiosError } from "axios";
// common
import {
  HOSTNAMES,
  PORT_COMMENTS,
  PORT_MODERATION,
  PORT_POSTS,
  PORT_QUERY,
} from "@blog/constants";
import { EventMsg, EventReq } from "@blog/interfaces";
// local
import { events } from "..";

// init
const router = Router();

router
  .route("/")
  .get((_req, res: Response<EventMsg[]>, _next) => {
    res.status(200).send(events.values);
  })
  .post((req: EventReq, res, _next) => {
    const event = req.body;
    console.log(`incoming event: ${event.eventName}\n`, event.data);
    events.values.push(event);

    // send requests
    axios
      .post(`${HOSTNAMES.posts.internal}:${PORT_POSTS}/events`, event)
      .catch((err: AxiosError) => {
        console.log("POSTS", err.code, err.cause);
      });

    axios
      .post(`${HOSTNAMES.comments.internal}:${PORT_COMMENTS}/events`, event)
      .catch((err: AxiosError) => {
        console.log("COMMENTS", err.code, err.cause);
      });

    axios
      .post(`${HOSTNAMES.moderation.internal}:${PORT_MODERATION}/events`, event)
      .catch((err: AxiosError) => {
        console.log("MODERATION", err.code, err.cause);
      });

    axios
      .post(`${HOSTNAMES.query.internal}:${PORT_QUERY}/events`, event)
      .catch((err: AxiosError) => {
        console.log("QUERY", err.code, err.cause);
      });

    res.send({ status: "OK" });
  });

export default router;
