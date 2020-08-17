import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../action/notesAction";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePicture = () => {
    document.getElementById("fileSelector").click();
  };

  const handlefileChange = (e) => {
    console.log(e.target.files);

    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handlefileChange}
      />

      <div>
        <button className="btn" onClick={handlePicture}>
          Picture
        </button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
