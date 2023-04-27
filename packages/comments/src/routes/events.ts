import { Router } from "express";
import axios from "axios";
import {
  Comment,
  EventCommentUpdated,
  EventReq,
  Post,
} from "@blog/interfaces";
import { PORT_EVENT_BUS } from "@blog/constants/src/ports";
// local
import { comments } from "../seed";
import { serviceName } from "..";

const router = Router();

// router
router.route("/").post(async (req: EventReq, res, next) => {
  const { eventName, data } = req.body;
  console.log(`COMMENTS > EVENTS: ${eventName}\n`, data);

  if (eventName === "PostCreated") {
    const { id: postId } = data as Post;

    // add comments to store
    comments.initNewPostComments(postId);

    res.status(201).send({ msg: "OK" });

    next();
  } else if (eventName === "CommentModerated") {
    const { id, text, postId, status } = data as Comment;
    const comment = new Comment(id, text, postId, status);

    comments.updateComment(comment);
    console.log("updated comment", comments.getComment(comment));
    // emit comment updated event
    const event = new EventCommentUpdated(comment);
    // @todo create event method for event msg type
    // event.emit();
    await axios.post<EventCommentUpdated>(
      `http://localhost:${PORT_EVENT_BUS}/events`,
      event
    );

    res.status(203).send({ msg: "OK" });

    next();
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
