import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Tag from "./Tag";

const AddNote = ({ setNote, btnLabel }) => {
  const { register, handleSubmit } = useForm();

  // const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const messageRef = useRef("");

  const onSubmit = () => {};

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-bgGray z-50 text-blackALT">
      <div className="relative w-11/12 md:w-2/3 lg:w-2/6 py-8 bg-gray-100 rounded-lg flex items-center justify-center px-6">
        <IoClose
          className="absolute size-6 text-gray-600 top-3 right-6 hover:text-gray-800"
          onClick={() => setNote(false)}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center gap-y-4"
        >
          <input
            type="text"
            {...register("title")}
            placeholder="Add Title"
            className="w-full outline-none text-3xl bg-transparent"
          />
          <textarea
            {...register("content")}
            rows="8"
            placeholder="Content..."
            className="w-full resize-none rounded-sm outline-none px-3 py-1"
          ></textarea>
          <div className="flex flex-col w-full gap-y-2">
            <h5 className="font-[500]">Tags</h5>
            <div>
              <input
                type="text"
                name="tags"
                placeholder="Add Tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.value = e.target.value.trim();
                    for (let i = 0; i <= tags.length; i++) {
                      if (tags[i] === e.target.value) {
                        e.target.value = "";
                        setMessage("you already add this tag");
                        setTimeout(() => {
                          setMessage(" ");
                        }, 3000);
                      }
                    }
                    if (e.target.value !== "") {
                      setTags([...tags, e.target.value]);
                      e.target.value = "";
                    }
                  }
                }}
                className="rounded-sm text-sm py-1 px-3 outline-none"
              />
              <p className="text-[10px] text-red-500">{message}</p>
            </div>

            <div className="flex flex-wrap items-center gap-1 w-2/3">
              {tags.map((tag, index) => (
                <Tag
                  tag={tag}
                  key={index}
                  index={index}
                  tags={tags}
                  setTags={setTags}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-sm text-white"
          >
            {btnLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
