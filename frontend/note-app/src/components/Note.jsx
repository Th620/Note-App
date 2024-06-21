import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiPushpinLine } from "react-icons/ri";
import AddNote from "./AddNote";

const Note = () => {
  const [editNote, setEditNote] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  return (
    <div className="border rounded-sm py-2 px-4 col-span-6 md:col-span-3 lg:col-span-2 h-fit ">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-blackALT mr-10">Note One</h3>
        <RiPushpinLine
          onClick={() => {
            setIsPinned((prev) => !prev);
          }}
          className={`size-5 ${isPinned ? "text-blue-500" : "text-gray-300"}`}
        />
      </div>

      <p className="font-roboto text-blackALT">
        note component note component note component note component
      </p>
      <p className="my-2 text-slate-400">03-06-2024</p>
      <div className="flex items-center gap-x-3">
        <button
          type="button"
          onClick={() => {
            setEditNote(true);
          }}
          className="flex items-center text-slate-500 gap-x-1 text-sm hover:text-slate-600 transition-colors duration-100"
        >
          <MdEdit />
          <span>Edit</span>
        </button>
        <button
          type="button"
          onClick={() => {
            alert("you want to delete this note?");
          }}
          className="flex items-center text-slate-500  gap-x-1 text-sm hover:text-slate-600  transition-colors duration-100"
        >
          <MdDelete />
          <span>Delete</span>
        </button>
      </div>
      {editNote && <AddNote setNote={setEditNote} btnLabel={"Edit Note"} />}
    </div>
  );
};

export default Note;
