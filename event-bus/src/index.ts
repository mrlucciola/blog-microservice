import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = process.env.PORT || 8085;
// const asdf = EVENT_
// init
const app = express();

// add middlewares
app.use(bodyParser.json());

// base route
app.get("/", (_, res) => {
  res.send("Hello from event-bus service!");
});

// additional routes
app.post("/events", (req, res, _next) => {
  const event = req.body;

  // send requests
  axios.post("http://localhost:8080", event);
  axios.post("http://localhost:8081", event);
  axios.post("http://localhost:8082", event);

  res.send({ status: "OK" });
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
