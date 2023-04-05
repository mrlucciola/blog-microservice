import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// local
import commentsRouter from "./comments";

// constants
const PORT = process.env.PORT || 8081;

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

// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
