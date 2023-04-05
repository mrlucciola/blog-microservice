// mui
import { Card, Paper } from "@mui/material";

const CommentItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Card component={Paper} elevation={2}>
      {text}
    </Card>
  );
};

export default CommentItem;
