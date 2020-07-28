import * as React from 'react';
import { useContext, useReducer } from "react";
import "./App.css";
import notesContext from "./context";
import notesReducer from "./reducer";
import Nav from "./components/Nav";
import { AddNote }  from "./components/AddNote";
import NoteList from "./components/NoteList";
import EditNote from "./components/EditNote";
//TODO przerobic na ts i dodac BOLD

const App = () => {
  const initialState = useContext(notesContext);
  const [state, dispatch] = useReducer(notesReducer, initialState);
  
  return (
    <notesContext.Provider value={{ state, dispatch }}>
      <Nav />
      {state.currentNote === null ? ( //TODO react router  
        <>
        {/* // React .fragments  */}
          <AddNote />
          <NoteList />
        </>
      ) : (
        <EditNote />
      )}
    </notesContext.Provider>
  );
};

export default App;
