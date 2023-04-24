import express from "express";
import bodyParser from "body-parser";
import { PORT_MODERATION } from "@blog/common/src/constants";
// local
import eventsRoutes from "./events";

const app = express();

// add middlewares
app.use(bodyParser.json());

// add routes and services
app.use("/events", eventsRoutes);

// start server
app.listen(PORT_MODERATION, () => {
  console.log(
    `"Moderation" Server listening at http://localhost:${PORT_MODERATION}`
  );
});
