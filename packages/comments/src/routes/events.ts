import { Request, Router } from "express";
import { EventPostCreated, Post } from "@blog/common/src/interfaces";
import { comments } from "../seed";

const router = Router();

// router
router
  .route("/")
  .post((req: Request<null, any, EventPostCreated>, res, _next) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
      const { id: postId } = data as Post;

      // add comments to store
      comments[postId] = [];
    }
    return res.send("OK");
  });

export default router;
