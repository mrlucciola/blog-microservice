import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// common
import { PORT_COMMENTS } from "@blog/constants";
import { ServiceNames } from "@blog/interfaces";
// local
import routes from "./routes";

export const serviceName: ServiceNames = "comments";

// init
const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(cors());

// set routes
app.use("/", routes);

// start server
app.listen(PORT_COMMENTS, () => {
  console.log(`Server listening at http://localhost:${PORT_COMMENTS}`);
});
