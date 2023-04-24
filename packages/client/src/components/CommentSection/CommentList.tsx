import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { List } from "@mui/material";
// components
import CommentItem from "./CommentItem";

const CommentList: FC<{ postId: string }> = ({ postId }) => {
  // state
  const commentIds = useAppState((s) => s.comments.getCommentIds(postId));
  // build list of comments
  const commentElems = commentIds.map((commentId, idx) => (
    <CommentItem postId={postId} commentId={commentId} key={idx} />
  ));

  return <List sx={{ py: 0 }}>{commentElems}</List>;
};

export default observer(CommentList);
