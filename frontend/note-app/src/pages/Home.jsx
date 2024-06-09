import React, { useState } from "react";
import Header from "../components/Header";
import NotesContainer from "../components/NotesContainer";

const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div
      onClick={() => {
        if (openMenu) {
          setOpenMenu(false);
        }
      }}
      className="w-full min-h-screen px-6 md:px-20"
    >
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <NotesContainer />
    </div>
  );
};

export default Home;
