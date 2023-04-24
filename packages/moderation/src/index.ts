import express from "express";
import bodyParser from "body-parser";
import { PORT_MODERATION } from "@blog/common/src/constants";

const app = express();

// add middlewares
app.use(bodyParser.json());

// start server
app.listen(PORT_MODERATION, () => {
  console.log(
    `"Moderation" Server listening at http://localhost:${PORT_MODERATION}`
  );
});
