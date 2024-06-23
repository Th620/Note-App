import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiPushpinLine } from "react-icons/ri";
import AddNote from "./AddNote";
import Tag from "./Tag";
import { deleteNote, pinNote } from "../services/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isOverflow } from "../utils/isOverflow";
import NotePopUp from "./NotePopUp";

const Note = ({ note }) => {
  let user = JSON.parse(localStorage.getItem("account"));
  let token = user?.token;

  const [showOverflowBtnTag, setShowOverflowBtnTag] = useState(false);
  const [showNotePopUp, setShowNotePopUp] = useState(false);

  const tagRef = useRef();

  useEffect(() => {
    setShowOverflowBtnTag(isOverflow(tagRef?.current));
  }, [note]);

  const [editNote, setEditNote] = useState(false);

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

  const { mutate: mutatePinNote } = useMutation({
    mutationFn: ({ isPinned, token, id }) => {
      return pinNote({ isPinned, token, id });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="relative w-full md:w-[47%] lg:w-[31%]">
      {showNotePopUp && (
        <NotePopUp
          note={note}
          setShowNotePopUp={setShowNotePopUp}
          setEditNote={setEditNote}
        />
      )}
      <RiPushpinLine
        onClick={() => {
          mutatePinNote({
            isPinned: !note?.isPinned,
            token,
            id: note?._id,
          });
        }}
        className={`absolute size-5 ${
          note?.isPinned ? "text-blue-500" : "text-gray-300"
        }`}
      />
      <div
        onClick={() => {
          setShowNotePopUp(true);
        }}
        className="group flex flex-col border rounded-sm h-fit py-2 px-4  gap-y-2 hover:bg-slate-50 transition-colors duration-200"
      >
        <div className="flex justify-between w-full">
          <h3 className="text-lg overflow-ellipsis w-full font-semibold text-blackALT mr-10">
            {note?.title}
          </h3>
        </div>

        <p className="relative font-roboto text-blackALT w-full text-nowrap h-[25px] overflow-ellipsis overflow-hidden">
          {note?.content}
        </p>
        <div
          ref={tagRef}
          className="relative flex flex-nowrap items-center gap-y-1 overflow-hidden gap-x-2 h-6"
        >
          {note?.tags.map((item) => (
            <Tag tag={item} key={item} />
          ))}
          {showOverflowBtnTag && (
            <button
              type="button"
              onClick={() => {
                setShowNotePopUp((prev) => !prev);
              }}
              className="absolute right-2 text-slate-500 hover:text-slate-600 z-20 text-[11px]"
            >
              more...
            </button>
          )}
          {showOverflowBtnTag && (
            <div className="group-hover:bg-slate-50 transition-colors duration-200 absolute -top-1 -right-6 blur-[2px] h-8 w-20 bg-white z-10" />
          )}
        </div>
        <p className="text-slate-400">
          {new Date(note?.updatedAt).toLocaleString("default", {
            mounth: "long",
          })}
        </p>
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
              if (window.confirm("you want to delete this note?")) {
                mutateDeleteNote({ token, id: note._id });
              }
            }}
            className="flex items-center text-slate-500  gap-x-1 text-sm hover:text-slate-600  transition-colors duration-100"
          >
            <MdDelete />
            <span>Delete</span>
          </button>
        </div>
        {editNote && (
          <AddNote setNote={setEditNote} btnLabel={"Edit Note"} note={note} />
        )}
      </div>
    </div>
  );
};

export default Note;
