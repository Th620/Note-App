import React, { useState } from "react";
import Note from "./Note";
import { FaPlus } from "react-icons/fa";
import AddNote from "./AddNote";

const NotesContainer = () => {
  const [addNote, setAddNote] = useState(true);
  return (
    <div className="grid grid-cols-6 gap-y-3 gap-x-8 w-full min-h-screen py-10 pt-24">
      {addNote && <AddNote setNote={setAddNote} btnLabel={"Add Note"} />}
      <Note />
      {!addNote && (
        <button
          onClick={() => setAddNote(true)}
          className="fixed bottom-6 right-4 w-12 h-12 flex items-center justify-center bg-blue-500 rounded-lg z-40"
        >
          <FaPlus className="text-white text-xl" />
        </button>
      )}

      <div className="md:hidden fixed -bottom-8 left-0 w-full h-20 bg-white z-10 blur-sm"></div>
    </div>
  );
};

export default NotesContainer;
