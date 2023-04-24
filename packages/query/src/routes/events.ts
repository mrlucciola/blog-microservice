import { Router } from "express";
import { Comment, EventReq, Post } from "@blog/common/src/interfaces";
import { posts } from "../seed";
import { serviceName } from "..";

// init
const router = Router();

router.route("/").post((req: EventReq, res, next) => {
  const { eventName, data } = req.body;
  console.log(`QUERY > EVENTS: ${eventName}\n`, data);

  if (eventName === "PostCreated") {
    const { id, title } = data as Post;

    // add data to store
    posts[id] = new Post(id, title, []);
    res.status(201).send(data);
    next();
  } else if (eventName === "CommentCreated") {
    const { id, text, postId, status } = data as Comment;
    const newComment = new Comment(id, text, postId, status);

    // add data to store
    const post = posts[postId];
    post.comments.push(newComment);
    res.status(201).send(newComment);
    next();
  } else if (eventName === "CommentUpdated") {
    const { id, postId, status } = data as Comment;
    const comment = posts[postId].comments.find((comment) => {
      return comment.id === id;
    });
    comment!.status = status;
  } else {
    res.send({
      service: serviceName,
      eventName,
      msg: "event not handled",
    });
    next();
  }
});

export default router;
