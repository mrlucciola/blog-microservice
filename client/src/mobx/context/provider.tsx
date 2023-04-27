import { FC, ReactNode } from "react";
// state
import { useLocalStore } from "mobx-react-lite";
import { storeContext } from "./ctx";
import { RootStore } from "../stores/rootStore";

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const store = useLocalStore(() => new RootStore());

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export default StoreProvider;
