import { FC, useEffect } from "react";
// state
import { useAppState } from "./mobx/context/hooks";
// mui
import { Container, Divider, Paper, Stack } from "@mui/material";
// components
import PostCreate from "./components/PostView/PostCreate";
import PostList from "./components/PostView/PostList";

const App: FC = () => {
  // state
  const fetchPosts = useAppState((s) => s.posts.postsFetch);
  // effects
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container className="App" component={Paper} elevation={1} square>
      <Stack divider={<Divider sx={{ padding: "10px 0" }} />}>
        <PostCreate />
        <PostList />
      </Stack>
    </Container>
  );
};

export default App;
