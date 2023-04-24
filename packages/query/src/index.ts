import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// local
import eventsRoute from "./routes/events";
import postsRoute from "./routes/posts";
import { PORT_QUERY } from "@blog/common/src/constants";
import { ServiceNames } from "@blog/common/src/interfaces";

export const serviceName: ServiceNames = "query";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// base
app.get("/", (_, res) => {
  res.send("Hello from query service!");
});

app.use("/events", eventsRoute);
app.use("/posts", postsRoute);

// start server
app.listen(PORT_QUERY, () => {
  console.log(`"Query" Server listening at http://localhost:${PORT_QUERY}`);
});
