import { Router } from "express";
import { posts } from "..";
import { getFileTitle } from "@blog/common/src/utils";

const fileTitle = getFileTitle(__filename);
const baseRt = `/${fileTitle}`;

const router = Router();

router.route(baseRt).get((_req, res, next) => {
  res.send(posts.values);

  next();
});

export default router;
