import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

const routers = readdirSync(__dirname)
  .filter((f) => f !== path.basename(__filename) && f.includes(path.extname(f)))
  .map((f) => {
    const fp = `./${f}`;
    const router = require(fp).default;
    return router;
  });

// init
const router = Router();

// set routes
router.use("/", routers);

export default router;
