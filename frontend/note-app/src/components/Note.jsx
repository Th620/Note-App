import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Note = ({setAddNote}) => {
  return (
    <div className="border rounded-sm py-2 px-4 col-span-6 md:col-span-3 lg:col-span-2 h-fit ">
      <h3 className="text-lg font-semibold">Note One</h3>
      <p>note component note component note component note component</p>
      <p className="my-2 text-slate-400">03-06-2024</p>
      <div className="flex items-center gap-x-3">
        <button
          type="button"
          onClick={()=>{
            setAddNote()
          }}
          className="flex items-center text-slate-500 gap-x-1 text-sm hover:text-slate-600 transition-colors duration-100"
        >
          <MdEdit />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="flex items-center text-slate-500  gap-x-1 text-sm hover:text-slate-600  transition-colors duration-100"
        >
          <MdDelete />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Note;
