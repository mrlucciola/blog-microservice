import { Router } from "express";
import {
  Comment,
  EventCommentUpdated,
  EventReq,
  Post,
} from "@blog/common/src/interfaces";
import { comments } from "../seed";
import { serviceName } from "..";
import axios from "axios";
import { PORT_EVENT_BUS } from "@blog/common/src/constants";

const router = Router();

// router
router.route("/").post(async (req: EventReq, res, _next) => {
  const { type, data } = req.body;
  console.log(`COMMENTS > EVENTS: ${type}\n`, data);

  if (type === "PostCreated") {
    const { id: postId } = data as Post;

    // add comments to store
    comments.initNewPostComments(postId);
    res.status(201).send({ msg: "OK" });
  } else if (type === "CommentModerated") {
    const { id, text, postId, status } = data as Comment;
    const comment = new Comment(id, text, postId, status);

    comments.updateComment(comment);
    console.log("updated comment", comments.getComment(comment));
    // emit comment updated event
    const event = new EventCommentUpdated(comment);
    // @todo create event method for event msg type
    // event.emit();
    await axios.post<EventCommentUpdated>(
      `http://localhost${PORT_EVENT_BUS}/events`,
      event
    );
    res.status(203).send({ msg: "OK" });
  } else {
    res.send({
      service: serviceName,
      eventName: type,
      msg: "event not handled",
    });
  }
});

export default router;
