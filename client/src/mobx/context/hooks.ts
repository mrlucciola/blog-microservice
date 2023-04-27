import { Context, useContext } from "react";
// state
import { useObserver } from "mobx-react-lite";
// local
import { RootStoreType, storeContext } from "./ctx";

const useStoreData = <Selection, ContextData, Store>(
  context: Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection
) => {
  const value = useContext(context);
  if (!value) throw new Error();

  const store = storeSelector(value);
  return useObserver(() => dataSelector(store));
};

export const useAppState = <Selection>(
  dataSelector: (store: RootStoreType) => Selection
) => useStoreData(storeContext, (contextData) => contextData!, dataSelector);
