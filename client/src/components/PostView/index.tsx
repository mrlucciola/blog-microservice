import { FC } from "react";
// components
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const PostView: FC = () => {
  return (
    <div>
      <PostCreate />
      <PostList />
    </div>
  );
};

export default PostView;
