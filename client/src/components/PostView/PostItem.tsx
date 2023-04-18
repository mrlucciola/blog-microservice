import { useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
// components
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";
// interfaces
import { PostIdKey } from "./interfaces";

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

const PostItem: React.FC<{ postId: PostIdKey }> = ({ postId }) => {
  // state
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const postTitle = useAppState((s) => s.posts.getPostById(postId).title);
  const postIdStored = useAppState((s) => s.posts.getPostById(postId).id);
  const postCommentsCt = useAppState(
    (s) => s.posts.getPostById(postId).comments.length
  );
  // validate
  if (postId !== postIdStored) throw new Error("Post IDs do not match.");
  // event handlers
  const handleExpandClick = (isExpanded: boolean) => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Grid xs={12} md={6} xl={4}>
      <Card component={Paper} elevation={2}>
        <CardHeader title={postTitle} subheader={postId} />
        <CardActions>
          <Typography>{postCommentsCt} comments</Typography>
          <ExpandMore
            isExpanded={isExpanded}
            handleExpandClick={handleExpandClick}
          />
        </CardActions>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CommentList postId={postId} />
          <CommentCreate postId={postId} />
        </Collapse>
      </Card>
    </Grid>
  );
};

export default observer(PostItem);
