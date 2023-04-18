import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// local
import { PORT_QUERY } from "./constants";
import eventsRoute from "./routes/events";

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

// start server
app.listen(PORT_QUERY, () => {
  console.log(`"Query" Server listening at http://localhost:${PORT_QUERY}`);
});
