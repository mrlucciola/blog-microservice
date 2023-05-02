import express from "express";
import bodyParser from "body-parser";
// common
import { HOST_ADDR_MODERATION, PORT_MODERATION } from "@blog/constants";
import { ServiceNames } from "@blog/interfaces";
import { addRoutes } from "@blog/utils";

export const serviceName: ServiceNames = "moderation";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());

// add routes
app.use("/", addRoutes());

// start server
app.listen(PORT_MODERATION, () => {
  console.log(`"Moderation" Server listening at ${HOST_ADDR_MODERATION}`);
});
