// mui
import { Box, Typography } from "@mui/material";
// interfaces
import { PostProps } from "./PostList";

const PostItem: React.FC<PostProps> = ({ id, title }) => {
  return (
    <Box>
      <Typography>{id}</Typography>
      <Typography>{title}</Typography>
    </Box>
  );
};

export default PostItem;
