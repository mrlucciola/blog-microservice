import { Request, Router } from "express";
import { randomBytes } from "crypto";

// init
const router = Router();
class Post {
  id: string;
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
// seed
const posts: { [key: string]: Post } = {
  asdf: new Post("asdf", "test post 1 asdf"),
  cc9012j8: new Post("cc9012j8", "test post 2 cc9012j8"),
};

router
  .route("/")
  // send all posts (@todo add pagination)
  .get((_req, res, _next) => {
    res.send(posts);
  })
  // create new post
  .post((req: Request<{}, {}, { title: string }>, res, _next) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    if (!title) res.status(404).send("Please include title.");
    else {
      posts[id] = new Post(id, title);

      res.status(201).send(posts[id]);
    }
  });
export default router;
