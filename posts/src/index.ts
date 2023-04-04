// modules
import express from "express";
// import cors from "cors";
// import { join } from "path";

// constants
const PORT = process.env.PORT || 8080;
// init
const app = express();
// middlewares
// app.use(cors());
// app.use(express.json());
// Serve the HTML page
app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});
app.get("/posts", (req: any, res: any) => {
  res.send("Hello World!");
});
app.post("/posts", (req: any, res: any) => {
  res.send("Hello World!");
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
