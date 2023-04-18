import { Request, Router } from "express";
import { EventPostCreated, Post } from "../interfaces";
import { posts } from "../seed";

// init
const router = Router();

router
  .route("/events")
  .post((req: Request<null, any, EventPostCreated>, res, _next) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
      const { id, title } = data;
      posts[id] = new Post(id, title);
    }
  });

export default router;
