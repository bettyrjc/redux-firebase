import { db } from "../firebase/config";

// cargar las notas de la base de datos
export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();

  const notes = [];

  notesSnap.forEach((snapHijo) => {
    // console.log(snapHijo.data());
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });
  // console.log(notes);

  return notes;
};
