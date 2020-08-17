import { db } from "../firebase/config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNotes = () => {
  // get state es para obtener el objeto
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getDate(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});
export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});
// tener las notas
export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch({
      type: types.notesLoad,
      payload: notes,
    });
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFireStore = { ...note };
    // este delete es para borrar el id y no se mute en el noteToFire
    delete noteToFireStore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);
    // esto no porque es muy lazy
    // dispatch(startLoadingNotes(uid));

    dispatch({
      type: types.notesUpdated,
      payload: {
        id: note.id,
        note: note,
      },
    });

    Swal.fire("Save", note.title, "success");
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Cargando",
      text: "Please wait",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;

    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch({
      type: types.notesDelete,
      payload: id,
    });
  };
};

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
