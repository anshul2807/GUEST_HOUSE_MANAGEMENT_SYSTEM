import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(UserContext);

  // Toggle the mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo (Clickable, redirects to Home) */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          GUEST HOUSE MANAGEMENT SYSTEM
        </Link>

        {/* Hamburger Icon (Mobile view) */}
        <button
          onClick={toggleMenu}
          className="block lg:hidden text-blue-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Links (Desktop view) */}
        <div className="hidden lg:flex items-center space-x-6">
          {user.isLogin ? (
            <>
              {/* Profile Logo */}
              <div className="flex relative">
                <img
                  src={user.profilePic || "https://www.svgrepo.com/show/343494/profile-user-account.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {/* Dropdown menu (optional) */}
                <button
                  onClick={
                    ()=>logoutUser()}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ml-4"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu (Toggleable) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white py-4 px-6 space-y-4">
          {user.isLogin ? (
            <>
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePic || "https://www.svgrepo.com/show/343494/profile-user-account.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={()=>logoutUser()}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors block"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors block"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
