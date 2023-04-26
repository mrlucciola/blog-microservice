// import path from "path";

export const getFileTitle = (filePath: string) => {
  const path = require("path");
  const scriptName = path.basename(filePath);
  /** i.e.: `.ts` */
  const extName = path.extname(scriptName);
  const fileTitle = scriptName.replace(extName, "").trim();

  return fileTitle;
};
