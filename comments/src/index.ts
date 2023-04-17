import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// local
import commentsRouter from "./routes/comments";
import eventsRouter from "./routes/events";
import { PORT_COMMENTS } from "./constants";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// base
app.get("/", (_, res) => {
  res.send("Hello from comments service!");
});
// app.use("/posts", postsRouter);
app.use("/posts", commentsRouter);
app.use("/events", eventsRouter);

// start server
app.listen(PORT_COMMENTS, () => {
  console.log(`Server listening at http://localhost:${PORT_COMMENTS}`);
});
