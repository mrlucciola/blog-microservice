import { Router } from "express";

// init
const router = Router();

// listening at /events/
router.route("/").post(async (req, res, _next) => {
  console.log("incoming event", req.body);
});

export default router;
