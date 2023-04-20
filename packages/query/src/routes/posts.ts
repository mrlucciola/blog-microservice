import { Router } from "express";
import { posts } from "../seed";

const router = Router();
router.route("/").get((_req, res, next) => {
  res.send(posts);

  next();
});

export default router;
