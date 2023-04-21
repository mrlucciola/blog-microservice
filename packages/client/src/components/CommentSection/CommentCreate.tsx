import { FC, ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { Button, Divider, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// other
import { Comment } from "./interfaces";
import { PORT_COMMENTS } from "@blog/common/constants";

const CommentCreate: FC<{ postId: string }> = ({ postId }) => {
  // state
  const [commentText, setCommentText] = useState<string>("");
  const commentsPush = useAppState((s) => s.comments.pushComment);
  const activateAlert = useAppState((s) => s.alerts.activateAlert);
  // event handlers
  const onChangeUpdateText = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setCommentText(e.target.value);
  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    if (!commentText) return activateAlert("error", "Comment text is empty.");

    const commentPayload = { text: commentText };
    try {
      const res = await axios.post<Comment>(
        `http://localhost:${PORT_COMMENTS}/posts/${postId}/comments`,
        commentPayload
      );

      const newComment = res.data;
      // reset the form
      setCommentText("");
      // add to state
      commentsPush(postId, newComment);
      console.log("comment", newComment);
      activateAlert("success", "New comment created.");
    } catch (err) {
      const { message, code } = err as AxiosError;

      activateAlert("error", "Error: cannot submit comment.");
      throw new Error(`Error submitting new comment:\n${code} - ${message}`);
    }
  };

  return (
    <Stack
      component="form"
      direction="row"
      justifyContent="center"
      onSubmit={onSubmitHandle}
      px={0.1}
      sx={{ backgroundColor: "inherit" }}
    >
      <TextField
        label="Add comment"
        value={commentText}
        onChange={onChangeUpdateText}
        variant="filled"
        fullWidth
      />
      <Divider orientation="vertical" />
      <Button variant="text" type="submit">
        <SendIcon />
      </Button>
    </Stack>
  );
};

export default observer(CommentCreate);
