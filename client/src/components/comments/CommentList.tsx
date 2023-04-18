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
  const comments = useAppState((s) => s.comments.getCommentsByPost(postId));
  // build list of comments
  const commentElems = comments.map(({ text }, idx) => {
    return <CommentItem text={text} key={idx} />;
  });

  return (
    <CardContent component={Paper} elevation={2}>
      {commentElems}
    </CardContent>
  );
};

export default observer(CommentList);
