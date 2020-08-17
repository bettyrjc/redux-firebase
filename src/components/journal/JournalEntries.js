import React from "react";
import { useSelector } from "react-redux";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
  // obteniendo la info del state
  const { notes } = useSelector((state) => state.notes);

  return (
    <div className="journal__entries ">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note} />
      ))}
    </div>
  );
};
