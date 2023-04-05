import { observer } from "mobx-react-lite";
// mui
import { Stack } from "@mui/material";
// components
import PostItem from "./PostItem";
import { useAppState } from "../../mobx/context/hooks";

export interface PostProps {
  id: string;
  title: string;
}
export interface PostListProps {
  [key: string]: PostProps;
}

const PostList: React.FC = () => {
  // state
  const posts = useAppState((s) => s.main.posts);

  // build
  const postElems = posts.map(({ id, title }, idx) => {
    return <PostItem id={id} title={title} key={idx} />;
  });
  return <Stack>{postElems}</Stack>;
};

export default observer(PostList);
