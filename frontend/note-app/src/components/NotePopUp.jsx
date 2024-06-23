import React from "react";
import Tag from "./Tag";
import { IoClose } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../services/note";

const NotePopUp = ({ note, setShowNotePopUp, setEditNote }) => {
  let user = JSON.parse(localStorage.getItem("account"));
  let token = user?.token;

  const queryClient = useQueryClient();

  const { mutate: mutateDeleteNote } = useMutation({
    mutationFn: ({ token, id }) => {
      return deleteNote({ token, id });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-bgGray flex justify-center items-center z-50">
      <div className="relative max-h-[90%] w-11/12 md:w-2/3 lg:w-2/6 py-8 px-6 bg-gray-100 rounded-lg flex flex-col justify-center gap-y-4">
        <IoClose
          className="absolute size-6 text-gray-600 top-3 right-6 hover:text-gray-700"
          onClick={() => {
            setShowNotePopUp(false);
          }}
        />
        <MdDelete
          className="absolute size-5 text-gray-600 top-[13.9px] right-14 hover:text-gray-700"
          onClick={() => {
            if (window.confirm("you want to delete this note?")) {
              mutateDeleteNote({ token, id: note._id });
            }
          }}
        />
        <MdEdit
          className="absolute size-5 text-gray-600 top-[13.9px] right-[88px] hover:text-gray-700"
          onClick={() => {
            setEditNote(true);
          }}
        />

        <h1 className="text-3xl w-full overflow-ellipsis">{note?.title}</h1>
        <div className="relative w-full px-6 overflow-hidden min-h-[50vh] flex justify-start items-start py-2">
          <p
            className={`par ${
              note?.content === "" && "text-slate-400"
            } absolute top-0 left-0 overflow-y-scroll -mr-5 h-[60vh]`}
          >
            {note?.content === "" ? "Empty note" : note?.content}
          </p>
        </div>
        <div className="relative flex flex-wrap items-center gap-y-1 gap-x-2">
          {note?.tags.map((item) => (
            <Tag tag={item} key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotePopUp;
