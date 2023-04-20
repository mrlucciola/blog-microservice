import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { ListItemButton, ListItemText } from "@mui/material";
// interfaces
import { PostIdKey } from "../PostView/interfaces";
import { CommentIdKey } from "./interfaces";

const CommentItem: FC<{
  postId: PostIdKey;
  commentId: CommentIdKey;
}> = ({ postId, commentId }) => {
  // state
  const text = useAppState(
    (s) => s.comments.getComment(postId, commentId).text
  );

  return (
    <ListItemButton
      disableRipple
      disableTouchRipple
      sx={{ backgroundColor: "#f4f6f9", marginY: "1px" }}
    >
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default observer(CommentItem);
