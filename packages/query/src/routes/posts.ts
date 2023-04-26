import { Router } from "express";
import { posts } from "..";
import { getFileTitle } from "../utils";

const fileTitle = getFileTitle(__filename);
const router = Router();

router.route("/posts").get((_req, res, next) => {
  res.send(posts.values);

  next();
});

export default router;
