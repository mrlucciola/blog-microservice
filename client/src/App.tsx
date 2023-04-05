import { useEffect } from "react";
// components
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";
// state
import { useAppState } from "./mobx/context/hooks";

const App: React.FC = () => {
  // state
  const fetchPosts = useAppState((s) => s.main.fetchPosts);
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
