// mui
import { Card, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
// components
import CommentItem from "./CommentItem";
import { Comment } from "./interfaces";

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
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
