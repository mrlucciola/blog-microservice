import { createContext } from "react";

export type AppContextType = {};
export const AppContext = createContext<AppContextType | null>(null);

// const AppProvider: React.FC<{ children?: React.ReactNode }> = ({
//   children,
// }) => {
//   return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
// };

// export default AppProvider;
