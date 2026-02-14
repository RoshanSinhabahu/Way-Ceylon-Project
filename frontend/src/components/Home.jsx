
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Hero from "./Hero";
import ResultList from "./ResultList";
import FeaturedSections from "./FeaturedSections";
import Loader from "./Loader";
import LocationDetails from "./LocationDetails";

function Home() {
    const [days, setDays] = useState(3);
    const [categories, setCategories] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);

    const loaderRef = useRef(null);
    const resultRef = useRef(null);

    // Scroll to top when showing details
    useEffect(() => {
        if (selectedLocation) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [selectedLocation]);

    // Scroll to loader when loading starts
    useEffect(() => {
        if (loading && loaderRef.current) {
            loaderRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [loading]);

    const { user } = useAuth();

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategories((prev) =>
            prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
        );
    };

    const handleSaveItinerary = async () => {
        if (!user) {
            alert("Please login to save your trip!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/save-itinerary", { itinerary: results }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Trip saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save trip.");
        }
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
        setSelectedLocation(null);

        try {
            // Use localhost for development to ensure consistency with Auth API
            const res = await axios.post("http://localhost:5000/recommendations", {
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

    const handleLocationSelect = (place) => {
        setSelectedLocation(place);
    };

    const handleBackToResults = () => {
        setSelectedLocation(null);
        setTimeout(() => {
            if (resultRef.current) {
                resultRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    const totalBudget = results.reduce((sum, place) => sum + (parseFloat(place.cost) || 0), 0);

    if (selectedLocation) {
        return <LocationDetails place={selectedLocation} onBack={handleBackToResults} />;
    }

    return (
        <div>
            <Hero
                days={days}
                setDays={setDays}
                categories={categories}
                setCategories={setCategories}
                handleCategoryChange={handleCategoryChange}
                handleSubmit={handleSubmit}
            />

            {!loading && !results.length && <FeaturedSections />}

            {loading && (
                <div ref={loaderRef}>
                    <Loader />
                </div>
            )}

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {results.length > 0 && (
                <div ref={resultRef} className="pb-10">
                    <ResultList
                        results={results}
                        totalBudget={totalBudget}
                        onLocationSelect={handleLocationSelect}
                    />
                    <div className="container mx-auto px-4 mt-8 mb-12 flex justify-center">
                        <button
                            onClick={handleSaveItinerary}
                            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-emerald-700 transition transform hover:scale-105 flex items-center gap-3"
                        >
                            <span>Save This Trip</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
