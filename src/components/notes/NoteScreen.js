import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotesAppBar } from "./NotesAppBar";
import { useForm } from "../customHooks/useForm";
import { activeNote, startDeleting } from "../../action/notesAction";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInput, reset] = useForm(note);

  const activeId = useRef(note.id);
  //   que cambie el estado cada vez que se seleccione una card nueva
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  // editar la nota
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const { body, title, id } = formValues;

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          name="title"
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          onChange={handleInput}
          value={title}
        />

        <textarea
          name="body"
          placeholder="What happened today"
          className="notes__textarea"
          onChange={handleInput}
          value={body}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="imagen" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
