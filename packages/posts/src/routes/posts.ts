import { NextFunction, Request, Response, Router } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";
import { randomBytes } from "crypto";
// common
import { PORT_EVENT_BUS } from "@blog/constants/src/ports";
import { Post, EventPostCreated } from "@blog/interfaces";
import { getFileTitle } from "@blog/common/src/utils";
// local
import { posts } from "../seed";

// init
const router = Router();
const baseRt = `/${getFileTitle(__filename)}`;

router
  .route(baseRt)
  // send all posts (@todo add pagination)
  .get((_req, res, _next) => {
    res.send(posts);
  })
  // create new post
  .post(
    async (
      req: Request<object, object, { title: string }>,
      res: Response,
      next: NextFunction
    ) => {
      const id = randomBytes(4).toString("hex");
      const { title } = req.body;

      // validation
      if (!title) {
        res.status(404).send("Please include title.");
        return;
      }

      // get data from db
      posts[id] = new Post(id, title, []);
      let postReq = new EventPostCreated(posts[id]);

      try {
        await axios.post<any, AxiosResponse<null, any>, EventPostCreated>(
          `http://localhost:${PORT_EVENT_BUS}/events`,
          postReq
        );

        res.status(201).send(posts[id]);
      } catch (error) {
        const err = error as AxiosError;
        console.log("error", err);
        if (err.code === "ECONNREFUSED") {
          res.status(404).send({
            msg: `Error sending to events service: ${err.code}`,
            err: err,
          });
        }
        // if (eventRes.status >= 400) {
        //   return res
        //     .status(404)
        //     .send(
        //       `Error sending to events (${eventRes.status}): ${eventRes.statusText}`
        //     );
        // }
      }

      next();
    }
  );

export default router;
