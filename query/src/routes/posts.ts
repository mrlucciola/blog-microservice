import { Router } from "express";
import { posts } from "../seed";

const router = Router();
router.route("/").get((req, res, _next) => {
  res.send(posts);
});

export default router;
