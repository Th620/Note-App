import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, editNote } from "../services/note";
import TagContainer from "./TagContainer";

const AddNote = ({ setNote, btnLabel, note }) => {
  let user = JSON.parse(localStorage.getItem("account"));
  let token = user?.token;

  const queryClient = useQueryClient();

  const { mutate: mutateAddNote, isPending: AddNoteIsPending } = useMutation({
    mutationFn: ({ title, content, tags, token }) => {
      return createNote({ title, content, tags, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setNote(false);
    },
    onError: (error) => {
      setNote(false);
      console.log(error);
    },
  });

  const { mutate: mutateEditNote, isPending: EditNoteIsPending } = useMutation({
    mutationFn: ({ title, content, tags, token, id }) => {
      return editNote({ title, content, tags, token, id });
    },
    onSuccess: (data) => {
      setNote(false);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      setNote(false);
      console.log(error);
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const [FormMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    }
  }, [note]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-bgGray z-50 text-blackALT">
      <div className="relative w-11/12 md:w-2/3 lg:w-2/6 py-8 bg-gray-100 rounded-lg flex items-center justify-center px-6">
        <IoClose
          className="absolute size-6 text-gray-600 top-3 right-6 hover:text-gray-800"
          onClick={() => setNote(false)}
        />
        <form className="w-full flex flex-col justify-center items-center gap-y-4">
          <input
            type="text"
            name="title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add Title"
            className="w-full outline-none text-3xl bg-transparent"
          />
          <textarea
            name="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            rows="8"
            value={content || ""}
            placeholder="Content..."
            className="w-full resize-none rounded-sm outline-none px-3 py-1"
          ></textarea>
          <div className="flex flex-col w-full gap-y-2">
            <h5 className="font-[500]">Tags</h5>
            <div>
              <input
                type="text"
                name="tags"
                defaultValue={""}
                placeholder="Add Tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.value = e.target.value.trim().replace(/\s+/g, " ");
                    for (let i = 0; i <= tags.length; i++) {
                      if (tags[i] === e.target.value) {
                        e.target.value = "";
                        setMessage("you already add this tag");
                        setTimeout(() => {
                          setMessage(" ");
                        }, 3000);
                      }
                    }
                    if (e.target.value !== "" && tags.length < 10) {
                      setTags([...tags, e.target.value.replace(/\s+/g, " ")]);
                      e.target.value = "";
                    }
                  }
                }}
                className="rounded-sm text-sm py-1 px-3 outline-none w-2/3"
              />
              <p className="text-[10px] text-red-500">{message}</p>
            </div>

            <div className="flex flex-wrap items-center gap-1 w-2/3">
              {tags.map((tag, index) => (
                <TagContainer
                  tag={tag}
                  key={tag}
                  index={index}
                  tags={tags}
                  setTags={setTags}
                />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-red-500 self-start">{FormMessage}</p>
          <button
            type="button"
            disabled={AddNoteIsPending || EditNoteIsPending}
            onClick={() => {
              if (title.length > 45) {
                return setFormMessage("Title is too long");
              }
              let words = title.split(" ");
              for (let i = 0; i < words.length; i++) {
                if (words[i].length > 20) {
                  return setFormMessage("Too long word");
                }
              }
              if (btnLabel === "Edit Note") {
                if (title === "") {
                  mutateEditNote({
                    title: "Untitled",
                    content,
                    tags,
                    token,
                    id: note._id,
                  });
                } else {
                  mutateEditNote({ title, content, tags, token, id: note._id });
                }
              } else {
                if (title === "") {
                  mutateAddNote({ title: "Untitled", content, tags, token });
                } else {
                  mutateAddNote({ title, content, tags, token });
                }
              }
            }}
            className="w-full bg-blue-500 py-3 rounded-sm text-white disabled:opacity-50"
          >
            {btnLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
