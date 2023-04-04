// modules
import express from "express";
import bodyParser from "body-parser";
import commentsRouter, { Comment, comments } from "./comments";
// import cors from "cors";

// constants
const PORT = process.env.PORT || 8081;

// init
const app = express();

// add middlewares
// app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

// base
app.get("/", (_, res) => {
  res.send("Hello World!");
});
// app.use("/posts", postsRouter);
app.use("/posts", commentsRouter);

// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
