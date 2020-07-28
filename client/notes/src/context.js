import * as React from "react";
import reducer from "./reducer";

//const [state, dispatch] = useReducer(notesReducer, initialState);

const NotesContext = React.createContext({
  // state: { currentNote: null, notes: [] },
  // dispatch: () => {},
  currentNote: null, notes: []
});
// export const notesProvider = ({children}) => {
//   const [state, dispatch] = React.useReducer(reducer, NotesContext);
//   return <NotesContext.Provider value={{state,dispatch}}>{children }</NotesContext.Provider>
// }

export default NotesContext;
