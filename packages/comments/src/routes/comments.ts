import { Request, Router } from "express";
import axios, { AxiosResponse } from "axios";
import { randomBytes } from "crypto";
import { CommentsMap, comments } from "../seed";
import { PORT_EVENT_BUS } from "@blog/common/src/constants";
import { Comment } from "@blog/common/src/interfaces";
import { EventCommentCreated } from "@blog/common/src/interfaces";

const router = Router();

// add route-specific middlewares
// router.use((req, res, next) => {});

// url-parameter-specific logic
// router.param("postId", (_req, _res, _next, val: string, name) => {
//   console.log(`val: ${val},  name: ${name}`);
//   _next();
// });

// comment creation
router
  .route("/:postId/comments")
  // route-specific middleware
  // .all()
  .get((req: Request<{ postId: string }>, res, _next) => {
    const { postId } = req.params;

    // simple way to handle empty arrays
    res.send(comments.getPostComments(postId) || new CommentsMap());
  })
  .post(
    async (
      req: Request<{ postId: string }, {}, { text: string }>,
      res,
      next
    ) => {
      const {
        params: { postId },
        body: { text },
      } = req;
      console.log(`COMMENTS > NEW: ${postId}\n`, text);
      const commentId = randomBytes(4).toString("hex");
      if (
        comments.getPostComments(postId) === undefined ||
        comments.getPostComments(postId) === null
      ) {
        res.status(400).send({});
        throw new Error(`no new post for: ${postId}`);
      }
      if (!text) return res.status(400).send("Please add text.");
      if (!postId) return res.status(400).send("Please add post id.");
      const newComment = new Comment(commentId, text, postId);
      // update store
      comments.pushComment(newComment);

      // emit event
      try {
        await axios.post<any, AxiosResponse<null, any>, EventCommentCreated>(
          `http://localhost:${PORT_EVENT_BUS}/events`,
          new EventCommentCreated(newComment)
        );
      } catch (error) {
        console.log("error sending comment to event bus", error);
        res
          .status(404)
          .send("error sending event to event bus - CommentCreated");
        return next();
      }

      // send response
      res.status(201).send(newComment);
      console.log("comments", comments.postsMap);
      next();
    }
  );

export default router;
