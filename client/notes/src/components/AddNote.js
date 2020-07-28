import * as React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import NotesContext from "../context";
import axios from "axios";
import { API } from "../Config/constants";

export const AddNote = () => {
  const { state,dispatch } = useContext(NotesContext);
  console.log(dispatch)
  const [value, setValue] = useState("");
  

  let ref = useRef();

  // useEffect(() => {
  //   ref.current.focus();
  // }, []);

  const postNewNoteToApi = async () => {
    try {
      const res = await axios.post(API, {
        title: value,
        text: "",
      })
      dispatch({ type: "ADD_NOTE", payload: res.data })
      setValue("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim() === "") { 
      alert("Write Title");
    } else {
      postNewNoteToApi();
    }
  };

  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <input type="text" ref={ref} onChange={handleChange} value={value} />
        <input type="submit" value="Add Note" />
      </form>
    </div>
  );
}
