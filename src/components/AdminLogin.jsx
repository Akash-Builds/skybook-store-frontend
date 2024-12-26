import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const auth = response.data;

            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has expired! Please log in again.');
                    navigate("/");
                }, 3600 * 1000);
            }

            alert("Admin Login successful!");
            navigate("/dashboard");
        } catch (error) {
            setMessage("Please provide a valid username and password");
            console.error(error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Admin Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Username
                        </label>
                        <input
                            {...register('username', { required: 'Username is required' })}
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
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
                            {...register('password', { required: 'Password is required' })}
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
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    &copy; 2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
