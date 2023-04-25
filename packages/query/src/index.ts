import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
// local
import eventsRoute, { handleEvent } from "./routes/events";
import postsRoute from "./routes/posts";
import { PORT_EVENT_BUS, PORT_QUERY } from "@blog/common/src/constants";
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
app.listen(PORT_QUERY, async () => {
  console.log(`"Query" Server listening at http://localhost:${PORT_QUERY}`);

  const res = await axios.get(`http://localhost:${PORT_EVENT_BUS}/events`);

  res.data.forEach((event) => {
    handleEvent(event);
  });
});
