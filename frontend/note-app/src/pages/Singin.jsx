import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Singin = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-10">
      <Header />
      <div className="w-full md:w-2/3 lg:w-1/4">
        <form className="w-full flex flex-col justify-center">
          <label htmlFor="name" className="py-2">
            Name:
          </label>
          <input
            type="text"
            name="text"
            className="w-full h-9 border px-3"
            placeholder="Name"
          />
          <label htmlFor="email" className="py-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="w-full h-9 border px-3"
            placeholder="Email"
          />
          <label htmlFor="password" className="py-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="w-full h-9 border px-3"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-500 pt-1 pb-2 text-white font-semibold rounded-sm mt-6"
          >
            Sign in
          </button>
        </form>

        <p className="my-2 self-start">
          you already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Singin;
