import { Response, Router } from "express";
import axios, { AxiosError } from "axios";
// common
import {
  HOST_ADDR_COMMENTS_INTERNAL,
  HOST_ADDR_MODERATION,
  HOST_ADDR_POSTS_INTERNAL,
  HOST_ADDR_QUERY_INTERNAL,
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
      .post(`${HOST_ADDR_POSTS_INTERNAL}/events`, event)
      .catch((err: AxiosError) => {
        console.log("POSTS", err.code, err.cause);
      });

    axios
      .post(`${HOST_ADDR_COMMENTS_INTERNAL}/events`, event)
      .catch((err: AxiosError) => {
        console.log("COMMENTS", err.code, err.cause);
      });

    axios
      .post(`${HOST_ADDR_MODERATION}/events`, event)
      .catch((err: AxiosError) => {
        console.log("MODERATION", err.code, err.cause);
      });

    axios
      .post(`${HOST_ADDR_QUERY_INTERNAL}/events`, event)
      .catch((err: AxiosError) => {
        console.log("QUERY", err.code, err.cause);
      });

    res.send({ status: "OK" });
  });

export default router;
