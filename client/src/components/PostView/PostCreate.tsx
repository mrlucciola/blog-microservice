import { ChangeEvent, FC, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
// state
import { useAppState } from "../../mobx/context/hooks";
// mui
import { Button, Stack, TextField, Typography } from "@mui/material";
// interfaces
import { Post, PostCreateRes } from "./interfaces";
import { PORT_POSTS } from "../../constants";
import { ErrorAlert, SuccessAlert } from "../../mobx/stores/alertsStore";

const PostCreate: FC = () => {
  // state
  const [postTitle, setPostTitle] = useState<string>("");
  const activateAlert = useAppState((s) => s.alerts.activateAlert);
  const postsPush = useAppState((s) => s.posts.postsPush);
  // event handlers
  const onChangeUpdateText = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setPostTitle(e.target.value);
  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    if (!postTitle) {
      activateAlert(new ErrorAlert("Error: could not create new post"));
    }

    const postPayload = { title: postTitle };
    try {
      const res = await axios.post<PostCreateRes>(
        `http://localhost:${PORT_POSTS}/posts`,
        postPayload
      );
      const newPost = new Post(res.data.id, res.data.title, []);

      // reset the form
      setPostTitle("");
      // add to state
      postsPush(newPost);
      activateAlert(new SuccessAlert("Created new post"));
    } catch (err) {
      const { message, code } = err as AxiosError;
      activateAlert(new ErrorAlert("Error: could not create new post"));
      throw new Error(`Error submitting new post:\n${code} - ${message}`);
    }
  };

  return (
    <Stack alignItems="start" spacing={2}>
      <Typography variant="h3">Create New Post</Typography>
      <Stack component="form" onSubmit={onSubmitHandle} sx={{ width: 300 }}>
        <TextField
          fullWidth
          variant="filled"
          label="Post Title"
          onChange={onChangeUpdateText}
          value={postTitle}
        />
        <Button fullWidth variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostCreate;
