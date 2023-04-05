import { Request, Router } from "express";
import { randomBytes } from "crypto";

export class Comment {
  id: string;
  text: string;
  postId: string;
  constructor(id: string, text: string, postId: PostIdKey) {
    this.id = id;
    this.text = text;
    this.postId = postId;
  }
}
type PostIdKey = string;
export const comments: { [key in PostIdKey]?: Comment[] } = {
  asdf: [
    new Comment("81hd9", " test comment1", "asdf"),
    new Comment("1ji9f", "another comment on asdf", "asdf"),
  ],
  cc9012j8: [
    new Comment("lm10d89", " this is a comment", "cc9012j8"),
    new Comment("c09uc98", " this is a comment", "cc9012j8"),
  ],
};

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
