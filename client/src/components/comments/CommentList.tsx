// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { CardContent, Paper } from "@mui/material";
// components
import CommentItem from "./CommentItem";
// interfaces
import { PostIdKey } from "../PostView/interfaces";

const CommentList: React.FC<{ postId: PostIdKey }> = ({ postId }) => {
  // state
  const commentIds = useAppState((s) => s.comments.getCommentIds(postId));
  // build list of comments
  const commentElems = commentIds.map((commentId, idx) => (
    <CommentItem postId={postId} commentId={commentId} key={idx} />
  ));

  return (
    <CardContent component={Paper} elevation={2}>
      {commentElems}
    </CardContent>
  );
};

export default observer(CommentList);
