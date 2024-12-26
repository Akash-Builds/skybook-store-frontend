import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert("Google sign-in failed");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {message && (
            <p className="text-red-500 text-sm italic text-center">{message}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all ease-in-out duration-300"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between my-6">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold shadow-md transition-all ease-in-out duration-300"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Register
          </Link>
        </p>

        <p className="text-center text-gray-400 text-xs mt-8">
          &copy; 2025 SKYBOOK. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
