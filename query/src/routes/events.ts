import { Request, Router } from "express";
import {
  Comment,
  EventCommentCreated,
  EventPostCreated,
  Post,
} from "../interfaces";
import { posts } from "../seed";

// init
const router = Router();

router.route("/events").post(
  (
    // @todo fix this
    req: Request<null, any, EventPostCreated & EventCommentCreated>,
    res,
    _next
  ) => {
    const { type, data } = req.body;
    console.log('type', type, 'commenty')

    if (type === "PostCreated") {
      const { id, title } = data as Post;

      // add data to store
      posts[id] = new Post(id, title);
    }
    if (type === "CommentCreated") {
      const { id, text, postId } = data as Comment;

      // add data to store
      const post = posts[postId];
      post.comments.push({ id, text, postId });
    }

    return res.status(201).send("OK");
  }
);

export default router;
