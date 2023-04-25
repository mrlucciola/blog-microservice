import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { ListItemButton, ListItemText } from "@mui/material";

const CommentItem: FC<{
  postId: string;
  commentId: string;
}> = ({ postId, commentId }) => {
  // state
  const comment = useAppState((s) => s.comments.getComment(postId, commentId));
  const statusColor =
    comment.status === "pending"
      ? "orange"
      : comment.status === "rejected"
      ? "red"
      : undefined;

  return (
    <ListItemButton
      disableRipple
      disableTouchRipple
      sx={{ backgroundColor: "#f4f6f9", marginY: "1px" }}
      disabled={comment.status === "rejected"}
    >
      <ListItemText
        secondaryTypographyProps={{ color: statusColor }}
        primary={comment.text}
        secondary={comment.status}
      />
    </ListItemButton>
  );
};

export default observer(CommentItem);
