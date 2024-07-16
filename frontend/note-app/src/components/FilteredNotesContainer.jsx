import React, { useEffect, useState } from "react";
import Note from "./Note";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchByTag } from "../services/note";
import { useSearchParams } from "react-router-dom";

const FilteredNotesContainer = () => {
  let user = JSON.parse(localStorage.getItem("account"));
  let token = user?.token;

  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  const [tag, setTag] = useState("");

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["tags"] });
    setTag(searchParam.get("keyword"))
  }, [searchParam, tag, queryClient]);

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => searchByTag({ token, keyword: searchParam.get("keyword") }),
    queryKey: ["tags"],
  });

  if (!notes) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-slate-300 gap-x-4">
        <span>There Is No Notes</span>
      </div>
    );
  }

  return (
    <div className="pt-24 h-screen">
      <h1 className="text-3xl">{`# ${tag}`}</h1>

      <div className="flex flex-wrap gap-y-5 gap-x-9 w-full min-h-fit py-10">
        {isLoading && (
          <div className="w-full flex justify-center items-center text-slate-500">
            Loading...
          </div>
        )}

        {(error || !notes) && (
          <div className="w-full flex justify-center items-center text-red-400 gap-x-4">
            <span>An Error Has Occured</span>
          </div>
        )}

        {notes.length === 0 ? (
          <div className="w-full flex justify-center items-center text-slate-300 gap-x-4">
            <span>There Is No Notes</span>
          </div>
        ) : (
          notes
            .sort((a, b) => {
              return new Date(a?.updateAt) - new Date(b?.updatedAt);
            })
            .filter((note) => note?.isPinned === true)
            .map((note) => <Note note={note} key={note._id} />)
        )}

        {notes.length !== 0 &&
          notes
            .sort((a, b) => {
              return new Date(a?.updateAt) - new Date(b?.updatedAt);
            })
            .filter((note) => note?.isPinned === false)
            .map((note) => <Note note={note} key={note._id} />)}
      </div>

      <div className="md:hidden fixed -bottom-8 left-0 w-full h-20 bg-white z-10 blur-sm"></div>
    </div>
  );
};

export default FilteredNotesContainer;
