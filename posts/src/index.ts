// modules
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import express from "express";
// import cors from "cors";
// import { join } from "path";

// constants
const PORT = process.env.PORT || 8080;

// init
const app = express();

// add middlewares
// app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

// set up Posts routes and data
// @todo abstract out into separate file
const posts: { [key: string]: Post } = {};
class Post {
  id: string;
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
// send all posts (@todo add pagination)
app.get("/posts", (req, res) => {
  res.send(posts);
});
// create new post
app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = new Post(id, title);

  res.status(201).send(posts[id]);
});

// base
app.get("/", (_, res) => {
  res.send("Hello World!");
});
// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
