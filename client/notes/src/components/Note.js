import React, { useContext } from "react";
import NotesContext from "../context";
import axios from "axios";
import {API} from '../Config/constants'

export default function Note({ note }) {
  const { dispatch } = useContext(NotesContext);

  const DeleteNote = async () => {
    try {
      const res = await axios.delete(`${API}${note._id}`, {
        data: { foo: 'bar' }
       })
       dispatch({ type: "DELETE_NOTE", payload: note._id });
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="note">
      <p className="note-title">{note.title.length > 20 ? note.title.slice(0,20) + '...' : note.title}</p>
      <p className='note-text'>{note.text==='' ? '...' : note.text.slice(0,18)}</p>
      <div className="btn-container">
        <button
          onClick={() => dispatch({ type: "SET_CURRENT_NOTE", payload: note })} //TODO set current note const zmienna all capitals
          className="edit"
        >
          Edit
        </button>
        <button onClick={() => DeleteNote()} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
}
