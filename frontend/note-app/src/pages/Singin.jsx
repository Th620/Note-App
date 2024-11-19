import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/reducers/userSlice";
import { signin } from "../services/user";
import { MdErrorOutline } from "react-icons/md";

const Singin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  let user = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signin({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      navigate("/");
    },
    onError: (error) => {
      setError(error.message);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  useEffect(() => {
    if (user.userInfo) {
      navigate("/");
    }
  }, [navigate, user.userInfo]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-10">
      <Header />
      <div className="w-full md:w-2/3 lg:w-1/4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center"
        >
          <label htmlFor="name" className="py-2">
            Name:
          </label>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            placeholder="Name"
            className={`w-full p-2 border px-3 outline-none rounded-sm ${
              errors.name ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.name?.message && (
            <p className="text-[10px] text-red-500">{errors.name?.message}</p>
          )}
          <label htmlFor="email" className="py-2">
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Enter a valid email",
              },
            })}
            placeholder="Email"
            className={`w-full p-2 border px-3 outline-none rounded-sm ${
              errors.email ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.email?.message && (
            <p className="text-[10px] text-red-500">{errors.email?.message}</p>
          )}
          <label htmlFor="password" className="py-2">
            Password:
          </label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="Password"
            className={`w-full p-2 border px-3 outline-none rounded-sm mb-2 ${
              errors.password ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.password?.message && (
            <p className="text-[10px] text-red-500">
              {errors.password?.message}
            </p>
          )}
           {error && <p className="text-[10px] text-red-500 pt-2 capitalize">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 pt-1 pb-2 text-white font-semibold rounded-sm mt-4 disabled:opacity-50"
          >
            Sign Up
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
