import React, { useContext, useEffect } from "react";
import NotesContext from "../context";
import Note from "./Note";
import axios from "axios";
import { API } from "../Config/constants";


export default function NoteList({ note }) {
  const { state, dispatch } = useContext(NotesContext);
  //console.log(state.notes)

  useEffect(() => {
    (async function getCallFromApi() {
      try {
        if (state.notes == '') {
          const res = await axios.get(API);
          dispatch({ type: "GET_NOTES", payload: res.data });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  return (
    <div className="notes-container">
      {state.notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}
