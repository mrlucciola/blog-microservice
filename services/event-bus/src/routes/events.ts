import { Response, Router } from "express";
import axios, { AxiosError } from "axios";
// common
import {
  HOST_ADDR_POSTS,
  PORT_COMMENTS,
  PORT_MODERATION,
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
    axios.post(`${HOST_ADDR_POSTS}/events`, event).catch((err: AxiosError) => {
      console.log("POSTS", err.code, err.cause);
    });

    axios
      .post(`http://localhost:${PORT_COMMENTS}/events`, event)
      .catch((err: AxiosError) => {
        console.log("COMMENTS", err.code, err.cause);
      });

    axios
      .post(`http://localhost:${PORT_MODERATION}/events`, event)
      .catch((err: AxiosError) => {
        console.log("MODERATION", err.code, err.cause);
      });

    axios
      .post(`http://localhost:${PORT_QUERY}/events`, event)
      .catch((err: AxiosError) => {
        console.log("QUERY", err.code, err.cause);
      });

    res.send({ status: "OK" });
  });

export default router;
