import path from "path";
import { readdirSync } from "fs";

export const getFileTitle = (filePath: string) => {
  const scriptName = path.basename(filePath);
  /** i.e.: `.ts` */
  const extName = path.extname(scriptName);
  const fileTitle = scriptName.replace(extName, "").trim();

  return fileTitle;
};

/** must use __dirname and __filename */
export const addRoutes = (dirname: string, filename: string) => {
  const router = require("express").Router();

  readdirSync(dirname).forEach((f: string) => {
    if (f !== path.basename(filename) && f.includes(path.extname(f))) {
      /** i.e.: `<RouteBase>.ts` */
      const fileName = path.basename(f);
      /** i.e.: `.ts` */
      const fileExt = path.extname(fileName);
      /** The file title (filename without the extension) is also the base route name */
      const fileTitle = fileName.replace(fileExt, "").trim();
      /** i.e.: `<RouteBase>` */
      const routeBase = `/${fileTitle}`;
      /** i.e.: `./<RouteBase>.ts` */
      const relativeFilepath = `${dirname}/${f}`;
      const subRouter = require(relativeFilepath);
      console.log(routeBase, subRouter);

      router.use(routeBase, subRouter);
    }
  });

  return router;
};
