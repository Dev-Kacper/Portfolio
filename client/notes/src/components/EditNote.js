import React, { useState, useContext, useRef,useEffect } from "react";
import NotesContext from "../context";
import axios from "axios";
import {API} from '../Config/constants'

export default function EditNote() {
  
  const { state, dispatch } = useContext(NotesContext);
  //console.log(state.state)
  const [value, setValue] = useState(state.currentNote.text);
  const [titleValue, setTitle] = useState(state.currentNote.title);
  //console.log(state);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const PostEditedNoteToApi = async () => { 
    try {
      await axios.patch(`${API}${state.currentNote._id}`, { // put instead of patch
        title: titleValue,
        text: value,
      })
      dispatch({ type: "UPDATE_NOTE", payload: {titleValue,value} });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (titleValue.trim() === "") {  //TODO change validation snort
      alert("Cannot add a blank note");
    } else {
      PostEditedNoteToApi();  
    }
  };

  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <input
          className="note-title-input"
          onChange={handleChangeTitle}
          value={titleValue}
        ></input>
        <textarea
          ref={ref}
          style={ {fontWeight:'bold' }}
          onChange={handleChangeValue}
          value={value}
          name=""
          id=""
          cols="30"
          rows="10"
        />
        <div style={{ textAlign: "center" }}>
          <input type="submit" value='Update note'/>
        </div>
      </form>
    </div>
  );
}
