import { FC, MouseEvent as RMouseEvent, useState } from "react";
import axios from "axios";
// mui
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const PostCreate: FC = () => {
  // state
  const [postTitle, setPostTitle] = useState<string>("");
  // event handlers
  const onClickSubmit = async (
    _e: RMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const postPayload = { title: postTitle };

    try {
      await axios.post("http://localhost:8080/posts", postPayload);
    } catch (err) {
      throw new Error(`Error submitting new post:\n${err}`);
    }
  };

  return (
    <Stack alignItems="start">
      <Typography variant="h3">Create New Post</Typography>
      <Box sx={{ width: 300 }}>
        <TextField
          fullWidth
          variant="filled"
          label="Post Title"
          onChange={(e) => setPostTitle(e.target.value)}
          value={postTitle}
        />
        <Button fullWidth variant="contained" onClick={onClickSubmit}>
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default PostCreate;
