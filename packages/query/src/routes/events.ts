import { Request, Router } from "express";
import { Comment, EventMsg, Post } from "@blog/common/src/interfaces";
import { posts } from "../seed";

// init
const router = Router();

router.route("/").post(
  (
    // @todo use generic event type
    req: Request<null, any, EventMsg<Comment | Post>>,
    res,
    next
  ) => {
    const { type, data } = req.body;
    console.log(`QUERY > EVENTS: ${type}\n`,data)

    if (type === "PostCreated") {
      const { id, title } = data as Post;

      // add data to store
      posts[id] = new Post(id, title, []);
    }
    if (type === "CommentCreated") {
      const { id, text, postId } = data as Comment;
      const newComment = new Comment(id, text, postId);

      // add data to store
      const post = posts[postId];
      post.comments.push(newComment);
    }

    res.status(201).send(data);

    next();
  }
);

export default router;
