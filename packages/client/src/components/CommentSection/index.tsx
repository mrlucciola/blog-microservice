import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useAppState } from "../../mobx/context/hooks";
// mui
import { CardActions, Collapse, Divider, Typography } from "@mui/material";
// components
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";
import ExpandComments from "./ExpandComments";
import { PostIdKey } from "@blog/common/src/interfaces";

const CommentSection: FC<{ postId: PostIdKey }> = ({ postId }) => {
  // state
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const postCommentsCt = useAppState(
    (s) => s.posts.getPostById(postId).comments.length
  );
  // event handlers
  const handleExpandClick = (isExpanded: boolean) => {
    setIsExpanded(!isExpanded);
  };

  const backgroundColor = "#ebeef4";

  return (
    <>
      <CardActions sx={{ backgroundColor }}>
        <Typography>{postCommentsCt} comments</Typography>

        <ExpandComments
          isExpanded={isExpanded}
          handleExpandClick={handleExpandClick}
        />
      </CardActions>
      <Collapse
        sx={{ backgroundColor }}
        in={isExpanded}
        timeout="auto"
        unmountOnExit
      >
        <Divider />
        <CommentList postId={postId} />
        <CommentCreate postId={postId} />
      </Collapse>
    </>
  );
};

export default observer(CommentSection);
