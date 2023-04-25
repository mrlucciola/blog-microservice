import { Router } from "express";
import { Comment, EventMsg, EventReq, Post } from "@blog/common/src/interfaces";
// local
import { serviceName, posts } from "..";

// init
const router = Router();

export const handleEvent = ({ eventName, data }: EventMsg): boolean => {
  // event
  if (eventName === "PostCreated") {
    const { id, title } = data as Post;

    // add data to store
    posts.values[id] = new Post(id, title, []);
  } else if (eventName === "CommentCreated") {
    const { id, text, postId, status } = data as Comment;
    const newComment = new Comment(id, text, postId, status);

    // add data to store
    const post = posts.values[postId];
    post.comments.push(newComment);
  } else if (eventName === "CommentUpdated") {
    posts.updateCommentStatus(data as Comment);
  } else return false;

  return true;
};

router.route("/").post((req: EventReq, res, next) => {
  const { eventName, data } = req.body;
  console.log(`QUERY > EVENTS: ${eventName}\n`, data);

  const isHandled = handleEvent(req.body);

  res.send({
    service: serviceName,
    eventName,
    isHandled,
  });

  next();
});

export default router;
