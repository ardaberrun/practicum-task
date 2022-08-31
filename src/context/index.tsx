import React, { useReducer, useContext, createContext } from 'react';
import reducer from './reducer';

export type Todo = {
  id: string;
  content: string;
  isCompleted: boolean;
};

export type AppStateType = {
  user: string;
  todos: Todo[];
};

type ContextType = {
  state: AppStateType;
  dispatch: React.Dispatch<any>;
};

const INITIAL_STATE: AppStateType = {
  user: localStorage.getItem('user') || '',
  todos: [] as Todo[],
};

const GlobalContext = createContext<ContextType>({} as ContextType);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
