import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";
// components
import CommentSection from "../CommentSection";

const PostItem: FC<{ postId: string }> = ({ postId }) => {
  // state
  const postTitle = useAppState((s) => s.posts.getPostById(postId).title);
  const postIdStored = useAppState((s) => s.posts.getPostById(postId).id);
  // validation
  if (postId !== postIdStored) throw new Error("Post IDs do not match.");

  return (
    <Grid xs={12} md={6} lg={4} xl={3}>
      <Card elevation={1}>
        <CardHeader title={postTitle} sx={{ textAlign: "start" }} />
        <Divider variant="middle" />
        <CommentSection postId={postId} />
      </Card>
    </Grid>
  );
};

export default observer(PostItem);
