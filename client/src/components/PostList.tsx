import { useEffect, useState } from "react";
import axios from "axios";
// mui
import { Stack } from "@mui/material";
// components
import PostItem from "./PostItem";

export interface PostProps {
  id: string;
  title: string;
}
export interface PostListProps {
  [key: string]: PostProps;
}

const PostList: React.FC = () => {
  // state
  const [posts, setPosts] = useState<PostProps[]>([]);
  const updatePostsState = async () => {
    const res = await axios.get<PostListProps>("http://localhost:8080/posts");
    if (res.data) setPosts(Object.values(res.data));
  };
  // effect
  useEffect(() => {
    updatePostsState();
  }, []);
  // build
  const postElems = posts.map(({ id, title }, idx) => {
    return <PostItem id={id} title={title} key={idx} />;
  });
  return <Stack>{postElems}</Stack>;
};

export default PostList;
