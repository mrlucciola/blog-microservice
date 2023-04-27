import { Router } from "express";
// common
import { EventReq } from "@blog/interfaces";
// local
import { serviceName } from "..";
import { handleEvent } from "../utils";

// init
const router = Router();

router.route("/").post((req: EventReq, res, next) => {
  const { eventName, data } = req.body;
  console.log(`QUERY > EVENTS: ${eventName}\n`, data);

  const isHandled = handleEvent(req.body);

  res.send({
    service: serviceName,
    eventName,
    isHandled,
  });

  next();
});

export default router;
