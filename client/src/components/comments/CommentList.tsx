import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { CardContent, Divider, Stack } from "@mui/material";
// components
import CommentItem from "./CommentItem";
// interfaces
import { PostIdKey } from "../PostView/interfaces";

const CommentList: FC<{ postId: PostIdKey }> = ({ postId }) => {
  // state
  const commentIds = useAppState((s) => s.comments.getCommentIds(postId));
  // build list of comments
  const commentElems = commentIds.map((commentId, idx) => (
    <CommentItem postId={postId} commentId={commentId} key={idx} />
  ));

  return (
    <CardContent
      component={Stack}
      direction="column"
      spacing={0.5}
      divider={<Divider />}
    >
      {commentElems}
    </CardContent>
  );
};

export default observer(CommentList);
