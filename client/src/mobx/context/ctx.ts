// react
import { createContext } from "react";
// stores
import { RootStore } from "../stores/rootStore";

export type RootStoreType = ReturnType<() => RootStore>;

// context
export const storeContext = createContext<RootStoreType | null>(null);
const AppContext = createContext<RootStore>(new RootStore());

export default AppContext;
