import { Request, Router } from "express";
import axios, { AxiosResponse } from "axios";
import { randomBytes } from "crypto";
import { ReqEventCommentCreated } from "../interfaces";
import { comments } from "../seed";
import { PORT_EVENT_BUS } from "@blog/common/src/constants";
import { Comment, PostIdKey } from "@blog/common/src/interfaces";

const router = Router();

// add route-specific middlewares
// router.use((req, res, next) => {});

// url-parameter-specific logic
// router.param("postId", (_req, _res, _next, val: PostIdKey, name) => {
//   console.log(`val: ${val},  name: ${name}`);
//   _next();
// });

// comment creation
router
  .route("/:postId/comments")
  // route-specific middleware
  // .all()
  .get((req: Request<{ postId: PostIdKey }>, res, _next) => {
    const { postId } = req.params;

    // simple way to handle empty arrays
    res.send(comments[postId] || []);
  })
  .post(
    async (
      req: Request<{ postId: PostIdKey }, {}, { text: string }>,
      res,
      _next
    ) => {
      const {
        params: { postId },
        body: { text },
      } = req;
      const commentId = randomBytes(4).toString("hex");
      if (comments[postId] === undefined || comments[postId] === null) {
        res.status(400).send({});
        throw new Error(`no new post for: ${postId}`);
      }
      if (!text) return res.status(400).send("Please add text.");
      if (!postId) return res.status(400).send("Please add post id.");
      const newComment = new Comment(commentId, text, postId);
      // update store
      comments[postId]!.push(newComment);

      // emit event
      try {
        await axios.post<any, AxiosResponse<null, any>, ReqEventCommentCreated>(
          `http://localhost:${PORT_EVENT_BUS}/events`,
          new ReqEventCommentCreated("CommentCreated", newComment)
        );
      } catch (error) {
        console.log("error sending comment to event bus", error);
        return res
          .status(404)
          .send("error sending event to event bus - CommentCreated");
      }

      // send response
      return res.status(201).send(newComment);
    }
  );

export default router;
