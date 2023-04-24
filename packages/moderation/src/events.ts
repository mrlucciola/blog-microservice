import { Router, Request } from "express";
import axios, { AxiosResponse } from "axios";
import {
  Comment,
  EventCommentModerated,
  EventMsg,
  Post,
} from "@blog/common/src/interfaces";
import { PORT_EVENT_BUS } from "@blog/common/src/constants";

const router = Router();

router
  .route("/")
  .post(
    async (req: Request<null, any, EventMsg<Comment & Post>>, res, next) => {
      const { type, data } = req.body;
      console.log(`MOD > EVENTS: ${type}\n`, data);

      if (type === "CommentCreated") {
        const status = data.text === "orange" ? "rejected" : "approved";
        const dataTyped: Comment = new Comment(
          data.id,
          data.text,
          data.postId,
          status
        );
        dataTyped.updateStatus(status);

        await axios.post<any, AxiosResponse<null, any>, EventCommentModerated>(
          `http://localhost:${PORT_EVENT_BUS}/events`,
          new EventCommentModerated(dataTyped)
        );
        res.status(200).send("Emit CommentModerated");
        next();
      } else {

        // next("event not handled");
      }
    }
  );

export default router;
