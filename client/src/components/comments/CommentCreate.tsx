import { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";
// mui
import { Box, Button, TextField } from "@mui/material";
import { useAppState } from "../../mobx/context/hooks";
import { Comment } from "./interfaces";
import { PORT_COMMENTS } from "../../constants";

const CommentCreate: React.FC<{ postId: string }> = ({ postId }) => {
  // state
  const [commentText, setCommentText] = useState<string>("");
  const commentsPush = useAppState((s) => s.comments.commentsByPostPush);
  // event handlers
  const onChangeUpdateText = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setCommentText(e.target.value);
  const handleSubmit = async () => {
    // validation
    if (!commentText) throw new Error("Comment text is empty");

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
    } catch (err) {
      const { message, code } = err as AxiosError;

      throw new Error(`Error submitting new post:\n${code} - ${message}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <TextField
        label="Add comment"
        value={commentText}
        onChange={onChangeUpdateText}
      />
      <Button variant="contained" type="submit">
        Send
      </Button>
    </Box>
  );
};

export default CommentCreate;
