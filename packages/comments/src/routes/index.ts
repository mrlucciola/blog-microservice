import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";

// init
const router = Router();

readdirSync(__dirname).forEach((f) => {
  if (f !== path.basename(__filename) && f.includes(path.extname(f))) {
    const scriptName = path.basename(f);
    /** i.e.: `.ts` */
    const extName = path.extname(scriptName);
    /** The file title (filename without the extension) is also the base route name */
    const fileTitle = scriptName.replace(extName, "").trim();
    const routeBase = `/${fileTitle}`;
    const relativeFilepath = `./${f}`;

    const subRouter = require(relativeFilepath).default;

    router.use(routeBase, subRouter);
    // console.log("filetitle", fileTitle);
    // console.log("routeBase", routeBase);
    // console.log("relativeFilepath", relativeFilepath);
    // console.log("subRouter", subRouter.stack);
    // console.log('\n\nupdated router', router)
  }
});

// const routers = readdirSync(__dirname)
//   .filter((f) => f !== path.basename(__filename) && f.includes(path.extname(f)))
//   .map((f) => {
//     const fp = `./${f}`;
//     const router = require(fp).default;
//     return router;
//   });

// // set routes
// router.use("/", routers);

export default router;
