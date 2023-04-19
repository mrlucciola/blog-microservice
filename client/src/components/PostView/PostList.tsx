import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import {
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
// components
import PostItem from "./PostItem";
// interfaces
import { Comment } from "../comments/interfaces";
import { PostIdKey } from "./interfaces";

export interface PostProps {
  id: PostIdKey;
  title: string;
  comments: Comment[];
}
export interface PostListProps {
  [key: string]: PostProps;
}

const PostList: React.FC = () => {
  // state
  const postIds = useAppState((s) => s.posts.postIds);
  // build
  const postElems = postIds.map((postId, idx) => {
    return <PostItem postId={postId} key={idx} />;
  });

  return (
    <Stack p={1} divider={<Divider />}>
      <Typography variant="h3" textAlign="start">
        Posts
      </Typography>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {postElems}
      </Grid>
    </Stack>
  );
};

export default observer(PostList);
