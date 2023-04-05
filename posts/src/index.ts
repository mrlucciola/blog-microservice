import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// local
import postsRoutes from "./posts";

// constants
const PORT = process.env.PORT || 8080;

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// base
app.get("/", (_, res) => {
  res.send("Hello World!");
});
app.use("/posts", postsRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
