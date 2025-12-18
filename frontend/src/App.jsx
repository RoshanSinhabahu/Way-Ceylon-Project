import React, { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Footer from "./components/Footer";
import Privacy from "./components/Privacy";
import NavBar from "./components/NavBar";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,      // animation speed
      once: true,         // animate only once
      offset: 100,        // how far before animation triggers
    });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<Privacy />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
