import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { Card, CardContent, Paper, Typography } from "@mui/material";
// interfaces
import { PostIdKey } from "../PostView/interfaces";
import { CommentIdKey } from "./interfaces";

const CommentItem: FC<{
  postId: PostIdKey;
  commentId: CommentIdKey;
}> = ({ postId, commentId }) => {
  // state
  const text = useAppState(
    (s) => s.comments.getComment(postId, commentId).text
  );

  return (
    <Card elevation={0} sx={{ backgroundColor: "inherit" }}>
      <CardContent >
        <Typography variant="body1" component="div" textAlign="start">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default observer(CommentItem);
