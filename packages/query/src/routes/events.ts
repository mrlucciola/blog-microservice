import { Router } from "express";
import { Comment, EventMsg, EventReq, Post } from "@blog/common/src/interfaces";
// local
import { serviceName, posts } from "..";

// init
const router = Router();

export const handleEvent = ({ eventName, data }: EventMsg): boolean => {
  // event
  if (eventName === "PostCreated") {
    posts.addPost(data as Post);
  } else if (eventName === "CommentCreated") {
    // add data to store
    posts.pushComment(data as Comment);
  } else if (eventName === "CommentUpdated") {
    posts.updateComment(data as Comment);
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
