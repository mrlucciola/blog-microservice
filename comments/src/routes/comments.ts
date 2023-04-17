import { Request, Router } from "express";
import { randomBytes } from "crypto";
import { Comment, PostIdKey } from "../interfaces";
import { comments } from "../seed";

const router = Router();

// add route-specific middlewares
// router.use((req, res, next) => {});
router.param("postId", (_req, _res, _next, val: PostIdKey, name) => {
  console.log(`val: ${val},  name: ${name}`);
  _next();
});
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
    (req: Request<{ postId: PostIdKey }, {}, { text: string }>, res, _next) => {
      const {
        params: { postId },
        body: { text },
      } = req;
      const commentId = randomBytes(4).toString("hex");
      if (!comments[postId]) res.status(203).send({});

      if (!text) {
        res.status(400).send("Please add text.");
        return;
      } else if (!postId) {
        res.status(400).send("Please add post id.");
        return;
      } else {
        const newComment = new Comment(commentId, text, postId);
        comments[postId]?.push(newComment);
        res.status(201).send(newComment);
      }
    }
  );

export default router;
