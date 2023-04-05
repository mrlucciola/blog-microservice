import { useEffect } from "react";
// components
import PostCreate from "./components/PostView/PostCreate";
import PostList from "./components/PostView/PostList";
// state
import { useAppState } from "./mobx/context/hooks";

const App: React.FC = () => {
  // state
  const fetchPosts = useAppState((s) => s.main.postsFetch);
  // effects
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <PostCreate />
      <PostList />
    </div>
  );
};

export default App;
