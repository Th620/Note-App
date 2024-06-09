import React from "react";
import { IoClose } from "react-icons/io5";

const AddNote = ({ setNote, btnLabel }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-bgGray z-50 ">
      <div className="relative w-11/12 md:w-2/3 lg:w-1/2 py-8 bg-gray-100 rounded-lg flex items-center justify-center px-6">
        <IoClose
          className="absolute size-6 text-gray-600 top-3 right-6 hover:text-gray-800"
          onClick={() => setNote(false)}
        />
        <form className="w-full flex flex-col justify-center items-center">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Add Title"
            className="w-full outline-none text-3xl bg-transparent"
          />
          <textarea
            name="content"
            id="content"
            rows="12"
            placeholder="Content..."
            className="w-full resize-none my-6 rounded-md outline-none px-3 py-1"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-md text-white"
          >
            {btnLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
