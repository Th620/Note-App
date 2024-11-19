import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!e.target.classList.contains("menu")) {
        setOpenMenu(false);
      }
    });
  }, []);

  const { name } = localStorage.account ? JSON.parse(localStorage.account) : "";

  return (
    <header className="fixed top-0 left-0 bg-white w-screen flex justify-between items-center px-6 pr-8 py-4 z-50 shadow-sm text-blackALT">
      <Link to={"/"}>
        <h1 className="font-semibold text-2xl">Notes App</h1>
      </Link>
      <input className="hidden" type="search" name="search" />
      <div
        className="rounded-full menu w-9 h-9 flex items-center justify-center text-lg bg-slate-300 test-blackALT "
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {name ? (
          name.split(" ").length >= 2 ? (
            name.split(" ")[0][0].toUpperCase() +
            name.split(" ")[1][0].toUpperCase()
          ) : (
            name[0].toUpperCase()
          )
        ) : (
          <CgProfile className="size-6 menu" />
        )}
      </div>
      {openMenu && (
        <div
          id="menu"
          className="absolute menu top-[90%] right-8 w-1/3 md:w-1/6 flex flex-col justify-center items-center transition-all duration-300 bg-slate-200 rounded-sm py-3 gap-y-2"
        >
          <h6 className="capitalize">{name}</h6>
          <button
            type="button"
            onClick={() => {
              if (name) {
                dispatch(logout());
                navigate("/");
                window.location.reload();
              } else {
                navigate("/register");
                setOpenMenu(false);
              }
            }}
            className="bg-blue-500 px-3 py-1 pb-2 rounded-sm text-white"
          >
            {name ? "Log Out" : "Sign Up"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
