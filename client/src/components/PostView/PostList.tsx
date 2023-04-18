import { observer } from "mobx-react-lite";
// mui
import { Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
// components
import PostItem from "./PostItem";
import { useAppState } from "../../mobx/context/hooks";
import { useEffect } from "react";
import { Comment } from "../comments/interfaces";

export interface PostProps {
  id: string;
  title: string;
  comments: Comment[];
}
export interface PostListProps {
  [key: string]: PostProps;
}

const PostList: React.FC = () => {
  // state
  const posts = useAppState((s) => s.main.posts);
  const fetchComments = useAppState((s) => s.comments.commentsByPostFetch);
  // get comments for posts
  const postIds = posts.map((post) => post.id);
  useEffect(() => {
    fetchComments(postIds);
  }, [postIds.length]);

  // build
  const postElems = posts.map(({ id, title, comments }, idx) => {
    return <PostItem id={id} title={title} comments={comments} key={idx} />;
  });

  return (
    <Stack alignItems="start" spacing={2}>
      <Typography variant="h3">Posts</Typography>
      <Grid container spacing={2} sx={{ width: "100%", background: "green" }}>
        {postElems}
      </Grid>
    </Stack>
  );
};

export default observer(PostList);
