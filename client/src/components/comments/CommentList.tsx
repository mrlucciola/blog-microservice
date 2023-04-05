// mui
import { Card, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// components
import CommentItem from "./CommentItem";
import { PostIdKey } from "../PostView/interfaces";

const CommentList: React.FC<{ postId: PostIdKey }> = ({ postId }) => {
  const comments = useAppState((s) => s.comments.commentsByPost[postId]);

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
