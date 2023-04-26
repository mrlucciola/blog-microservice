import { Comment, EventMsg, Post } from "@blog/common/src/interfaces";
import { posts } from ".";
import path from "path";

export const getFileTitle = (filePath: string) => {
  const scriptName = path.basename(filePath);
  /** i.e.: `.ts` */
  const extName = path.extname(scriptName);
  const fileTitle = scriptName.replace(extName, "").trim();

  return fileTitle;
};

export const handleEvent = ({ eventName, data }: EventMsg): boolean => {
  // event
  if (eventName === "PostCreated") {
    posts.addPost(data as Post);
  } else if (eventName === "CommentCreated") {
    // add data to store
    posts.createComment(data as Comment);
  } else if (eventName === "CommentUpdated") {
    posts.updateComment(data as Comment);
  } else return false;

  return true;
};
