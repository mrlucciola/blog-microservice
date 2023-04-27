import { Router } from "express";
import { posts } from "..";

const router = Router();

router.route("/").get((_req, res, next) => {
  res.send(posts.values);

  next();
});

export default router;
