import { Router } from "express";
import { Comment, EventReq, Post } from "@blog/common/src/interfaces";
import { posts } from "../seed";
import { serviceName } from "..";

// init
const router = Router();

router.route("/").post((req: EventReq, res, next) => {
  const { type, data } = req.body;
  console.log(`QUERY > EVENTS: ${type}\n`, data);

  if (type === "PostCreated") {
    const { id, title } = data as Post;

    // add data to store
    posts[id] = new Post(id, title, []);
    res.status(201).send(data);
  }
  if (type === "CommentCreated") {
    const { id, text, postId, status } = data as Comment;
    const newComment = new Comment(id, text, postId, status);

    // add data to store
    const post = posts[postId];
    post.comments.push(newComment);
    res.status(201).send(newComment);
  }

  res.send({
    service: serviceName,
    eventName: type,
    msg: "event not handled",
  });
  next();
});

export default router;
