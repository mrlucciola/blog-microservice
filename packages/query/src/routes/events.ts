import { Router } from "express";
import { EventReq } from "@blog/interfaces";
import { getFileTitle } from "@blog/common/src/utils";
// local
import { serviceName } from "..";
import { handleEvent } from "../utils";

const fileTitle = getFileTitle(__filename);
const baseRt = `/${fileTitle}`;
// init
const router = Router();

router.route(baseRt).post((req: EventReq, res, next) => {
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
