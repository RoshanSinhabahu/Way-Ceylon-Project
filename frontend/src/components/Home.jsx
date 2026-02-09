
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Hero from "./Hero";
import ResultList from "./ResultList";
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
        setSelectedLocation(null);

        try {
            const res = await axios.post("https://wayceylon-project.onrender.com/recommendations", { // hosted backend
                //const res = await axios.post("http://localhost:5000/recommendations", { // localhost 
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

    const totalBudget = results.reduce((sum, place) => sum + (place.cost || 0), 0);

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

            {loading && (
                <div ref={loaderRef}>
                    <Loader />
                </div>
            )}

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {results.length > 0 && (
                <div ref={resultRef}>
                    <ResultList
                        results={results}
                        totalBudget={totalBudget}
                        onLocationSelect={handleLocationSelect}
                    />
                </div>
            )}
        </div>
    );
}

export default Home;
