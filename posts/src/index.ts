import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// local
import postsRoutes from "./posts";
import { POSTS_PORT } from "./constants";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// base
app.get("/", (_, res) => {
  res.send("Hello from posts service!");
});
app.use("/posts", postsRoutes);

// start server
app.listen(POSTS_PORT, () => {
  console.log(`"Posts" Server listening at http://localhost:${POSTS_PORT}`);
});
