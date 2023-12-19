import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

function reducer(state, action) {
  return {
    ...state,
    [action.selection]: action.action,
  };
}
export const StateProvider = ({ children }) => {
  const [appState, dispatchAppState] = useReducer(reducer, {
    sidebar: {
      isOpen: true,
    },
  });

  const value = {
    appState,
    dispatchAppState,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
};
