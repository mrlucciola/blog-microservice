import { FC, ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { Button, Stack, TextField } from "@mui/material";
// other
import { Comment } from "./interfaces";
import { PORT_COMMENTS } from "../../constants";

const CommentCreate: FC<{ postId: string }> = ({ postId }) => {
  // state
  const [commentText, setCommentText] = useState<string>("");
  const commentsPush = useAppState((s) => s.comments.pushComment);
  // event handlers
  const onChangeUpdateText = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setCommentText(e.target.value);
  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <Stack
      component="form"
      direction="row"
      justifyContent="center"
      onSubmit={onSubmitHandle}
    >
      <TextField
        label="Add comment"
        value={commentText}
        onChange={onChangeUpdateText}
      />
      <Button variant="outlined" type="submit">
        Send
      </Button>
    </Stack>
  );
};

export default observer(CommentCreate);
