import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// local
import postsRoutes from "./services/posts";
import eventsRoutes from "./services/events";
import { PORT_POSTS } from "@blog/common";

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
app.use("/events", eventsRoutes);

// start server
app.listen(PORT_POSTS, () => {
  console.log(`"Posts" Server listening at http://localhost:${PORT_POSTS}`);
});
