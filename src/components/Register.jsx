import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert("User registration successful");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful");
    } catch (error) {
      alert("Google sign-in failed");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-10 py-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {message && (
              <p className="text-red-500 text-sm italic mb-4">{message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md"
            >
              Register
            </button>
          </form>
          <div className="flex items-center justify-between my-6">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:underline transition duration-300"
            >
              Login
            </Link>
          </p>
        </div>
        <p className="text-center text-gray-400 text-xs py-4 bg-gray-50">
          ©2025 SKYBOOK. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
