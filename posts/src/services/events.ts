import { Router } from "express";

// init
const router = Router();

// listening at /events/
router.route("/").post((req, res, _next) => {
  console.log("receiving event for post", req.body.type);

  return res.send("OK");
});

export default router;
