import { useLocalStore } from "mobx-react-lite";
import { storeContext } from "./ctx";
import { RootStore } from "../stores/rootStore";

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useLocalStore(() => new RootStore());

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export default StoreProvider;
