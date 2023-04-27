import express from "express";
import bodyParser from "body-parser";
// common
import { PORT_MODERATION } from "@blog/constants/src/ports";
import { ServiceNames } from "@blog/interfaces";
// local
import routes from "./routes";

export const serviceName: ServiceNames = "moderation";

const app = express();

// add middlewares
app.use(bodyParser.json());

// add routes and services
app.use("/", routes);

// start server
app.listen(PORT_MODERATION, () => {
  console.log(
    `"Moderation" Server listening at http://localhost:${PORT_MODERATION}`
  );
});
