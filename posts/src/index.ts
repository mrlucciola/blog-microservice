// modules
import express from "express";
import bodyParser from "body-parser";
// local
import postsRoutes from "./posts";
// import cors from "cors";

// constants
const PORT = process.env.PORT || 8080;

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
app.use("/posts", postsRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
