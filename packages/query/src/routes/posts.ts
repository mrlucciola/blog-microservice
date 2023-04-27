import { Router } from "express";
import { getFileTitle } from "@blog/utils";
import { posts } from "..";

const fileTitle = getFileTitle(__filename);
const baseRt = `/${fileTitle}`;

const router = Router();

router.route(baseRt).get((_req, res, next) => {
  res.send(posts.values);

  next();
});

export default router;
