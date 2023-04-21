import express, { Request } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {
  PORT_COMMENTS,
  PORT_EVENT_BUS,
  PORT_POSTS,
  PORT_QUERY,
} from "@blog/common/constants";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());

// base route
app.get("/", (_, res) => {
  res.send("Hello from event-bus service!");
});

// additional routes
app.post(
  "/events",
  (
    req: Request<{}, {}, { type: string; data: { id: string; title: string } }>,
    res,
    _next
  ) => {
    const event = req.body;
    console.log("incoming event:", event);

    // send requests
    axios.post(`http://localhost:${PORT_POSTS}/events`, event);
    axios.post(`http://localhost:${PORT_COMMENTS}/events`, event);
    axios.post(`http://localhost:${PORT_QUERY}/events`, event);

    return res.send({ status: "OK" });
  }
);

// start server
app.listen(PORT_EVENT_BUS, () => {
  console.log(`Server listening at http://localhost:${PORT_EVENT_BUS}`);
});
