import express from "express";
import bodyParser from "body-parser";
// common
import { HOSTNAMES, PORTS } from "@blog/constants";
import { ServiceNames } from "@blog/interfaces";
import { addRoutes } from "@blog/utils";
// local
import { EventsStore } from "./store";
import { seedEvents } from "./seed";

export const serviceName: ServiceNames = "event-bus";

// init
const app = express();
export const events = new EventsStore(seedEvents);

// add middlewares
app.use(bodyParser.json());

// add routes
app.use("/", addRoutes());

// start server
app.listen(PORTS.eventBus, () => {
  console.log(
    `Server listening at ${HOSTNAMES.eventBus.internal}:${PORTS.eventBus}`
  );
});
