import React, { useState } from "react";
import Note from "./Note";
import { FaPlus } from "react-icons/fa";
import AddNote from "./AddNote";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../services/note";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

const NotesContainer = () => {
  let user = JSON.parse(localStorage.getItem("account"));
  let token = user?.token;

  const [addNote, setAddNote] = useState(false);

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getNotes({ token }),
    queryKey: ["notes"],
  });

  if (!notes) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-slate-300 gap-x-4">
        <FaRegNoteSticky className="size-16" />
        <span>There Is No Notes</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between gap-y-5 gap-x-8 w-full min-h-screen py-10 pt-24">
      {addNote && <AddNote setNote={setAddNote} btnLabel={"Add Note"} />}

      {isLoading && (
        <div className="w-full flex justify-center items-center text-slate-500">
          Loading...
        </div>
      )}

      {(error || !notes) && (
        <div className="w-full flex justify-center items-center text-red-400 gap-x-4">
          <MdErrorOutline className="size-6" />
          <span>An Error Has Occured</span>
        </div>
      )}

      {notes.length === 0 ? (
        <div className="w-full flex justify-center items-center text-slate-300 gap-x-4">
          <FaRegNoteSticky className="size-16" />
          <span>There Is No Notes</span>
        </div>
      ) : (
        notes.map((note) => <Note note={note} key={note._id} />)
      )}

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
