import { useState } from "react";
import { observer } from "mobx-react-lite";
// mui
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Unstable_Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
// components
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";
// interfaces
import { PostProps } from "./PostList";
import { useAppState } from "../../mobx/context/hooks";

const ExpandMore: React.FC<{
  isExpanded: boolean;
  handleExpandClick: (_: boolean) => void;
}> = ({ isExpanded, handleExpandClick }) => {
  const theme = useTheme();

  return (
    <IconButton
      sx={{
        background: "whitesmoke",
        marginLeft: "auto",
        transform: !isExpanded ? "rotate(0deg)" : "rotate(180deg)",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      }}
      aria-expanded={isExpanded}
      aria-label="Show more"
      onClick={() => handleExpandClick(isExpanded)}
    >
      <ExpandMoreOutlined />
    </IconButton>
  );
};

const PostItem: React.FC<PostProps> = ({ id, title, comments }) => {
  // state
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const commentsCt = comments.length;
  // event handlers
  const handleExpandClick = (isExpanded: boolean) => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Grid xs={12} md={6} xl={4}>
      <Card component={Paper} elevation={2}>
        <CardHeader title={title} subheader={id} />
        <CardActions>
          <Typography>{commentsCt} comments</Typography>
          <ExpandMore
            isExpanded={isExpanded}
            handleExpandClick={handleExpandClick}
          />
        </CardActions>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            {commentsCt > 0 && <CommentList comments={comments} />}
          </CardContent>
          <CommentCreate postId={id} />
        </Collapse>
      </Card>
    </Grid>
  );
};

export default observer(PostItem);
