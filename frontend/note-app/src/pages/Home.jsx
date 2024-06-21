import React from "react";
import Header from "../components/Header";
import NotesContainer from "../components/NotesContainer";

const Home = () => {
  return (
    <div className="w-full min-h-screen px-6 md:px-20">
      <Header />
      <NotesContainer />
    </div>
  );
};

export default Home;
