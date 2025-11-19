import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Hero from "./components/Hero";
import ResultList from "./components/ResultList";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Privacy from "./components/Privacy";
import NavBar from "./components/NavBar";

function App() {
  const [days, setDays] = useState(3);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loaderRef = useRef(null);
  const resultRef = useRef(null);

  // Scroll to loader when loading starts
  useEffect(() => {
    if (loading && loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categories.length === 0) {
      alert("Select at least one category.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.post("https://wayceylon-project.onrender.com/recommendations", {
        //const res = await axios.post("http://localhost:5000/recommendations", {
        days: parseInt(days),
        categories,
      });
      setResults(res.data);

      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  const totalBudget = results.reduce((sum, place) => sum + (place.cost || 0), 0);

  return (
      <div>
        <NavBar />
        <Hero
          days={days}
          setDays={setDays}
          categories={categories}
          setCategories={setCategories}
          handleCategoryChange={handleCategoryChange}
          handleSubmit={handleSubmit}
        />

        {loading && (
          <div ref={loaderRef}>
            <Loader />
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {results.length > 0 && (
          <div ref={resultRef}>
            <ResultList results={results} totalBudget={totalBudget} />
          </div>
        )}
        <Footer />
      </div>
  );
}

export default App;
