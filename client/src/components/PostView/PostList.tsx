import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import {
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
// components
import PostItem from "./PostItem";

const PostList: FC = () => {
  // state
  const postIds = useAppState((s) => s.posts.postIds);
  // build
  const postElems = postIds.map((postId, idx) => {
    return <PostItem postId={postId} key={idx} />;
  });

  return (
    <Stack component={Container} alignItems="start" spacing={2} py={1}>
      <Typography variant="h3" textAlign="start">
        Posts
      </Typography>
      <Grid container direction="row" spacing={1} sx={{ width: "100%" }}>
        {postElems}
      </Grid>
    </Stack>
  );
};

export default observer(PostList);
