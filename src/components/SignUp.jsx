import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import Logo from "./Logo";
import Input from "./Input";
import Button from "./Button";
import logo from '../assets/logo-2.png'

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const createAcc = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userDate = await authService.getCurrentUser();
        if (userDate) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 justify-center flex">
          <span className="inline-block w-full  max-w-[100px]">
           
           <img src={logo} alt="logo" className="w-full   rounded-md"/>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up to your Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have any account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-pretty transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createAcc)}>
          <div className="space-y-5">
            <Input
              label="Full Name:"
              type="text"
              placeholder="Enter Your Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      value
                    ) || (
                      <ul>
                        <li>- at least 8 characters</li>
                        <li>- must contain at least 1 uppercase letter, 1
                          lowercase letter, and 1 number
                        </li>
                        <li>- Can contain special characters</li>
                      </ul>
                    ),
                },
              })}
            />
            <Button
            type="submit"
            className="w-full">Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
