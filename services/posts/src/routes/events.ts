import { Router } from "express";
// common
import { EventReq } from "@blog/interfaces";

// init
const router = Router();

// listening at /events/
router.route("/").post((req: EventReq, res, _next) => {
  console.log("Post event:", req.body.eventName);

  return res.send("OK");
});

export default router;
