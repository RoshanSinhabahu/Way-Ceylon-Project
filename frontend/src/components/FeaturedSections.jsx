import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedSections = () => {
    const [featured, setFeatured] = useState([]);
    const [budget, setBudget] = useState([]);
    const [loading, setLoading] = useState(true);

    const featuredScrollRef = useRef(null);
    const budgetScrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use localhost for endpoints
                const [featuredRes, budgetRes] = await Promise.all([
                    axios.get("http://localhost:5000/destinations/featured"),
                    axios.get("http://localhost:5000/destinations/budget")
                ]);
                setFeatured(featuredRes.data);
                setBudget(budgetRes.data);
            } catch (err) {
                console.error("Failed to fetch slider data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const scroll = (ref, offset) => {
        if (ref.current) {
            ref.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    if (loading) return null; // Or a skeleton loader if preferred

    const Section = ({ title, data, scrollRef, type }) => (
        <div className="py-8 my-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-emerald-500 pl-4">
                        {title}
                    </h2>
                    <div className="hidden md:flex space-x-2">
                        <button
                            onClick={() => scroll(scrollRef, -300)}
                            className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll(scrollRef, 300)}
                            className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {data.map((place, idx) => (
                        <div
                            key={idx}
                            className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 snap-center group cursor-pointer"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                                    {type === "featured" ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-500 fill-current" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            {place.likes}
                                        </>
                                    ) : (
                                        <span className="text-emerald-700">Rs {place.cost}</span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                                    <span className="text-white bg-emerald-600/80 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
                                        {place.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{place.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 h-10">{place.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 pb-10">
            {featured.length > 0 && (
                <Section
                    title="Travelers' Favorites"
                    data={featured}
                    scrollRef={featuredScrollRef}
                    type="featured"
                />
            )}
            {budget.length > 0 && (
                <Section
                    title="Budget Friendly Gems"
                    data={budget}
                    scrollRef={budgetScrollRef}
                    type="budget"
                />
            )}
        </div>
    );
};

export default FeaturedSections;
