import { Request, Router } from "express";
import { randomBytes } from "crypto";
import axios, { AxiosError, AxiosResponse } from "axios";
import { PORT_EVENT_BUS } from "../constants";
import { Post, ReqEventPostCreated } from "../interfaces";

// init
const router = Router();

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
  .post(async (req: Request<{}, {}, { title: string }>, res, _next) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    // validation
    if (!title) {
      res.status(404).send("Please include title.");
      return;
    }

    // get data from db
    posts[id] = new Post(id, title);
    let postReq = new ReqEventPostCreated("PostCreated", posts[id]);

    try {
      const eventRes = await axios.post<
        any,
        AxiosResponse<null, any>,
        ReqEventPostCreated
      >(`http://localhost:${PORT_EVENT_BUS}/events`, postReq);
    } catch (error) {
      const err = error as AxiosError;
      console.log("errorlx", err);
      if (err.code === "ECONNREFUSED") {
        return res.status(404).send({
          msg: `Error sending to events service: ${err.code}`,
          err: err,
        });
        ("");
      }
      // if (eventRes.status >= 400) {
      //   return res
      //     .status(404)
      //     .send(
      //       `Error sending to events (${eventRes.status}): ${eventRes.statusText}`
      //     );
      // }
    }

    res.status(201).send(posts[id]);
  });

export default router;
