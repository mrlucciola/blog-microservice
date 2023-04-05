import { useState } from "react";
// mui
import { Box, Button, TextField } from "@mui/material";

const CreatePost: React.FC = () => {
  const [postTitle, setPostTitle] = useState<string>();

  return (
    <Box sx={{ width: 300 }}>
      <TextField
        fullWidth
        variant="filled"
        label="Title"
        onChange={(e) => setPostTitle(e.target.value)}
        value={postTitle}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={(e) => {
          console.log(e);
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreatePost;
