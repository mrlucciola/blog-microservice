import { useEffect } from "react";
// components
import PostCreate from "./components/PostView/PostCreate";
import PostList from "./components/PostView/PostList";
// state
import { useAppState } from "./mobx/context/hooks";
import { Divider, Stack } from "@mui/material";

const App: React.FC = () => {
  // state
  const fetchPosts = useAppState((s) => s.main.postsFetch);
  // effects
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Stack className="App" divider={<Divider sx={{padding:'10px 0'}} />}>
      <PostCreate />
      <PostList />
    </Stack>
  );
};

export default App;
