import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiPushpinLine } from "react-icons/ri";
import AddNote from "./AddNote";
import Tag from "./Tag";

const Note = ({ note }) => {
  const [editNote, setEditNote] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  return (
    <div className="flex flex-col border rounded-sm py-2 px-4 w-full md:w-[47%] lg:w-[31%]  gap-y-2 hover:bg-slate-50 transition-colors duration-200">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-blackALT mr-10">
          {note.title}
        </h3>
        <RiPushpinLine
          onClick={() => {
            setIsPinned((prev) => !prev);
          }}
          className={`size-5 ${isPinned ? "text-blue-500" : "text-gray-300"}`}
        />
      </div>

      <p className="font-roboto text-blackALT h-[50px] overflow-hidden">{note.content} </p>
      <div className="flex gap-x-2">
        {note.tags.map((item) => (
          <Tag tag={item} key={item} />
        ))}
      </div>
      <p className="my-2 text-slate-400">03-06-2024</p>
      <div className="flex items-center gap-x-3 bottom-0">
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
