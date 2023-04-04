// modules
import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
// import cors from "cors";

// constants
const PORT = process.env.PORT || 8080;

// init
const app = express();

// add middlewares
// app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

// set up Posts routes and data
class Post {
  id: string;
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
// @todo abstract out into separate file
const posts: { [key: string]: Post } = {
  asdf: new Post("asdf", "test post 1 asdf"),
  cc9012j8: new Post("cc9012j8", "test post 2 cc9012j8"),
};

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
