import { Router } from "express";
import { EventReq } from "@blog/common/src/interfaces";
// local
import { serviceName } from "..";
import { getFileTitle, handleEvent } from "../utils";

const fileTitle = getFileTitle(__filename);
// init
const router = Router();

router.route(`/${fileTitle}`).post((req: EventReq, res, next) => {
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
