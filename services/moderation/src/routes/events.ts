import { Router } from "express";
import axios, { AxiosResponse } from "axios";
// common
import { HOST_ADDR_EVENT_BUS } from "@blog/constants";
import { Comment, EventCommentModerated, EventReq } from "@blog/interfaces";
// local
import { serviceName } from "..";

// init
const router = Router();

router.route("/").post(async (req: EventReq, res, next) => {
  const { eventName, data } = req.body;
  console.log(`MOD > EVENTS: ${eventName}\n`, data);

  if (eventName === "CommentCreated") {
    const { id: commentId, text, postId, status } = data as Comment;
    // validation
    const newStatus = text === "orange" ? "rejected" : "approved";

    // update store
    const comment = new Comment(commentId, text, postId, status);
    comment.updateStatus(newStatus);

    // emit event "CommentModerated"
    // @todo handle connection errors
    await axios.post<any, AxiosResponse<null, any>, EventCommentModerated>(
      `${HOST_ADDR_EVENT_BUS}/events`,
      new EventCommentModerated(comment)
    );

    // send response
    res.status(200).send("Emit CommentModerated");

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
