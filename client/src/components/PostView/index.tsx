import { FC } from "react";
// mui
import { Container } from "@mui/material";
// components
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const PostView: FC = () => {
  return (
    <Container>
      <PostCreate />
      <PostList />
    </Container>
  );
};

export default PostView;
