import { Request, Router } from "express";
import { Comment, EventMsg, Post } from "@blog/common/src/interfaces";
import { comments } from "../seed";
import { serviceName } from "..";

const router = Router();

// router
router
  .route("/")
  .post((req: Request<null, object, EventMsg<Post & Comment>>, res, next) => {
    const { type, data } = req.body;
    console.log(`COMMENTS > EVENTS: ${type}\n`, data);

    if (type === "PostCreated") {
      const { id: postId } = data as Post;

      // add comments to store
      comments.initNewPostComments(postId);
    } else if (type === "CommentModerated") {
      const comment = new Comment(data.id, data.text, data.postId, data.status);

      comments.updateComment(comment);
    } else {
      res.send({
        service: serviceName,
        eventName: type,
        msg: "event not handled",
      });
    }
  });

export default router;
