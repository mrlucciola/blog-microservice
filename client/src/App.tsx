// components
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

const App: React.FC = () => {
  
  return (
    <div className="App">
      <PostCreate />
      <PostList />
    </div>
  );
};

export default App;
