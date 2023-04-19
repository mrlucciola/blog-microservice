import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { Card, Paper } from "@mui/material";
import { PostIdKey } from "../PostView/interfaces";
import { CommentIdKey } from "./interfaces";

const CommentItem: React.FC<{
  postId: PostIdKey;
  commentId: CommentIdKey;
}> = ({ postId, commentId }) => {
  const text = useAppState(
    (s) => s.comments.getComment(postId, commentId).text
  );

  return (
    <Card component={Paper} elevation={2}>
      {text}
    </Card>
  );
};

export default observer(CommentItem);
