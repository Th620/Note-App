import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 bg-white w-screen flex justify-between items-center px-6 pr-8 py-4 z-50 shadow-sm">
      <Link to={"/"}>
        <h1 className="font-semibold text-2xl">Notes App</h1>
      </Link>
      <input className="hidden" type="search" name="search" />
      <div
        className="rounded-full flex items-center justify-center text-3xl"
        onClick={() => setOpenMenu(!openMenu)}
      ><CgProfile/></div>
      {openMenu && (
        <div className="absolute top-[90%] right-8 w-1/3 md:w-1/6 flex flex-col justify-center items-center transition-all duration-300 bg-slate-200 rounded-sm py-3 gap-y-2">
          <h6>User Name</h6>
          <button className="bg-blue-500 px-3 py-1 pb-2 rounded-sm text-white">
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
