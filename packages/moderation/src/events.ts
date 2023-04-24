import { Router } from "express";
import axios, { AxiosResponse } from "axios";
import {
  Comment,
  EventCommentModerated,
  EventReq,
} from "@blog/common/src/interfaces";
import { PORT_EVENT_BUS } from "@blog/common/src/constants";

const router = Router();

router.route("/").post(async (req: EventReq, res, next) => {
  const { type, data } = req.body;
  console.log(`MOD > EVENTS: ${type}\n`, data);

  if (type === "CommentCreated") {
    const { id: commentId, text, postId, status } = data as Comment;
    // validation
    const newStatus = text === "orange" ? "rejected" : "approved";
    const comment = new Comment(commentId, text, postId, status);
    comment.updateStatus(newStatus);

    await axios.post<any, AxiosResponse<null, any>, EventCommentModerated>(
      `http://localhost:${PORT_EVENT_BUS}/events`,
      new EventCommentModerated(comment)
    );
    res.status(200).send("Emit CommentModerated");
    next();
  } else {
    // next("event not handled");
  }
});

export default router;
