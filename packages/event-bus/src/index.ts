import express from "express";
import bodyParser from "body-parser";
import { PORT_EVENT_BUS } from "@blog/constants/src/ports";
import { ServiceNames } from "@blog/interfaces";
// local
import routes from "./routes";
import { EventsStore } from "./store";
import { seedEvents } from "./seed";

export const serviceName: ServiceNames = "event-bus";

// init
const app = express();
export const events = new EventsStore(seedEvents);

// add middlewares
app.use(bodyParser.json());

// add routes
app.use("/", routes);

// start server
app.listen(PORT_EVENT_BUS, () => {
  console.log(`Server listening at http://localhost:${PORT_EVENT_BUS}`);
});
