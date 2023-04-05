import { useState } from "react";
// mui
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const PostCreate: React.FC = () => {
  const [postTitle, setPostTitle] = useState<string>("");
  const onClickSubmit = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const postPayload = { title: postTitle };

    console.log("submitting:", postPayload);
    const res = await axios.post("http://localhost:8080/posts", postPayload);
    console.log('res', res)
  };

  return (
    <Box sx={{ width: 300 }}>
      <TextField
        fullWidth
        variant="filled"
        label="Title"
        onChange={(e) => setPostTitle(e.target.value)}
        value={postTitle}
      />
      <Button fullWidth variant="contained" onClick={onClickSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default PostCreate;
