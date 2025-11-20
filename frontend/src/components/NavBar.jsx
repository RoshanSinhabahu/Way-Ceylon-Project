import React, { useEffect, useRef } from "react";

const NavBar = () => {
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
        <div className="ml-2 text-xl font-bold">WayCeylon</div>
        <div className="flex flex-row flex-grow justify-end items-center space-x-8 mr-2">
          <a href="/" className="text-gray-700 hover:text-emerald-800 hover:scale-105 transition">
            Login
          </a>
          <a href="/" className="text-gray-700 hover:text-emerald-800 font-semibold hover:scale-105 transition">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;