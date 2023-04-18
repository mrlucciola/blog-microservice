// mui
import { Card, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
// components
import CommentItem from "./CommentItem";
import { PostIdKey } from "../PostView/interfaces";
import { useAppState } from "../../mobx/context/hooks";

const CommentList: React.FC<{ postId: PostIdKey }> = ({ postId }) => {
  // state
  const comments = useAppState((s) => s.comments.getCommentsByPost(postId));
  // build list of comments
  const commentElems = comments.map(({ text }, idx) => {
    return <CommentItem text={text} key={idx} />;
  });

  return (
    <Card component={Paper} elevation={2}>
      {commentElems}
    </Card>
  );
};

export default observer(CommentList);
