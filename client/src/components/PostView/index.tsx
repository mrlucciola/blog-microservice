import { FC } from "react";
// mui
import { Container, Paper } from "@mui/material";
// components
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const PostView: FC = () => {
  return (
    <Paper component={Container}>
      <PostCreate />
      <PostList />
    </Paper>
  );
};

export default PostView;
