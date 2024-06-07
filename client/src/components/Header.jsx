import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      document.cookie =
        "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isAuthenticated = !!document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_email="));

  return (
    <header className="p-4 bg-blue-500 text-white">
      <nav className="flex justify-between">
        <div>
          {isAuthenticated && (
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/sign-in" className="mr-4">
                Sign In
              </Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
