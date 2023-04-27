import path from "path";
import { readdirSync } from "fs";
import { Router } from "express";

export const getFileTitle = (filePath: string) => {
  const scriptName = path.basename(filePath);
  /** i.e.: `.ts` */
  const extName = path.extname(scriptName);
  const fileTitle = scriptName.replace(extName, "").trim();

  return fileTitle;
};

/** must use __dirname and __filename */
export const addRoutes = (): Router => {
  const router = Router();

  // @todo - validate dirname to be exactly one level below `packages`
  const cwd = require.main!.path;
  const routesDirName = `${cwd}/routes`;

  readdirSync(routesDirName).forEach((f: string) => {
    if (f !== "index.ts" && f.includes(".ts")) {
      /** i.e.: `<RouteBase>.ts` */
      const fileName = path.basename(f);
      /** i.e.: `.ts` */
      const fileExt = path.extname(fileName);
      /** The file title (filename without the extension) is also the base route name */
      const fileTitle = fileName.replace(fileExt, "").trim();
      /** i.e.: `<RouteBase>` */
      const routeBase = `/${fileTitle}`;
      /** i.e.: `./<RouteBase>.ts` */
      const relativeFilepath = `${routesDirName}/${f}`;
      const subRouter = require(relativeFilepath).default;

      router.use(routeBase, subRouter);
    }
  });

  return router;
};

export const getDir = (): string => {
  console.log("dirname:", __dirname);
  console.log("cwd:", process.cwd());
  console.log("main:", require.main);
  return __dirname;
};