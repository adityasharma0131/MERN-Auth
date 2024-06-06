import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Signup = () => {
  const initialFormData = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          throw new Error(errorData.message || "User already exists");
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      }

      const data = await res.json();
      toast.success(data.message || "User Created Successfully!");
      setFormData(initialFormData); // Reset form data
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // Display error toast
    }
  };

  return (
    <div className="h-full m-20 flex items-center justify-center">
      <div className="bg-gray-400 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex gap-2 mt-4 justify-center">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500 underline">Sign In</span>
          </Link>
        </div>
      </div>
      <Toaster /> {/* Add the Toaster component here */}
    </div>
  );
};

export default Signup;
