// components
import CreatePost from "./components/CreatePost";
// state
import { AppContext } from "./context";

const App: React.FC = () => {
  return (
    <div className="App">
      <CreatePost />
    </div>
  );
};

export default (
  <AppContext.Provider value={{}}>
    <App />
  </AppContext.Provider>
);
