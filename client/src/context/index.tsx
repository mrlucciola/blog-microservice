import { createContext } from "react";

export type AppContextType = {};
export const AppContext = createContext<AppContextType | null>(null);
