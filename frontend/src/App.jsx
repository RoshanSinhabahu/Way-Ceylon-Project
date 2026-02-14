import React, { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Footer from "./components/Footer";
import Privacy from "./components/Privacy";
import NavBar from "./components/NavBar";

import Login from "./components/Login";
import Signup from "./components/Signup";

import { AuthProvider } from "./context/AuthContext";
import MyItineraries from "./components/MyItineraries";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,      // animation speed
      once: true,         // animate only once
      offset: 100,        // how far before animation triggers
    });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-itineraries" element={<MyItineraries />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
