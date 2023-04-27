import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
// common
import { PORT_EVENT_BUS, PORT_QUERY } from "@blog/constants/src/ports";
import { EventMsg, ServiceNames } from "@blog/interfaces";
// local
import routes from "./routes";
// import eventsRoute from "./routes/events";
// import postsRoute from "./routes/posts";
import { PostsStore } from "./store";
import { handleEvent } from "./utils";

export const serviceName: ServiceNames = "query";

// init
const app = express();
export const posts = new PostsStore();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// start server
app.use("/", routes);
app.listen(PORT_QUERY, async () => {
  console.log(`"Query" Server listening at http://localhost:${PORT_QUERY}`);

  const res = await axios.get<EventMsg[]>(
    `http://localhost:${PORT_EVENT_BUS}/events`
  );

  res.data.forEach((event) => {
    // @todo add validation
    handleEvent(event);
  });
});
