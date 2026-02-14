import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navbarRef = useRef(null);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (navbarRef.current) {
        if (currentScroll > lastScroll) {
          navbarRef.current.style.transform = "translateY(-100%)";
        } else {
          navbarRef.current.style.transform = "translateY(0)";
        }
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 transition-transform duration-300"
      data-aos="fade-down"
    >
      <div className="m-2 bg-white/80 flex p-4 rounded-full items-center justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="ml-2 text-xl font-bold cursor-pointer text-black hover:text-emerald-800 transition-colors"
        >
          GoCeylon
        </Link>
        <div className="flex flex-row flex-grow justify-end items-center space-x-8 mr-2">
          {user ? (
            <>
              <span className="text-gray-700 hidden md:inline">Hello, {user.name}</span>
              <Link to="/my-itineraries" className="text-gray-700 hover:text-emerald-800 hover:scale-105 transition">
                My Trips
              </Link>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-600 font-semibold hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-emerald-800 hover:scale-105 transition">
                Login
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-emerald-800 font-semibold hover:scale-105 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;