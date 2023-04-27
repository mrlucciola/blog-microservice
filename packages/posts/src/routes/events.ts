import { Router } from "express";
// common
import { EventReq } from "@blog/interfaces";
import { getFileTitle } from "@blog/utils";

// init
const router = Router();
const baseRt = `/${getFileTitle(__filename)}`;

// listening at /events/
router.route(baseRt).post((req: EventReq, res, _next) => {
  console.log("Post event:", req.body.eventName);

  return res.send("OK");
});

export default router;
