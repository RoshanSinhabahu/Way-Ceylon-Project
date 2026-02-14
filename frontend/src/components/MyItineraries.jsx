import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyItineraries = () => {
    const { user } = useAuth();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/my-itineraries", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setItineraries(res.data);
            } catch (err) {
                console.error("Failed to fetch itineraries", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchItineraries();
    }, [user]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/my-itineraries/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state to remove the deleted item
            setItineraries(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error("Failed to delete itinerary", err);
            alert("Failed to delete itinerary.");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Please <Link to="/login" className="text-emerald-600 underline">log in</Link> to view your saved trips.</p>
            </div>
        );
    }

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="mt-12 container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Saved Itineraries</h1>

            {itineraries.length === 0 ? (
                <p className="text-gray-600">You haven't saved any trips yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {itineraries.map((item) => {
                        const trip = JSON.parse(item.itinerary);
                        const firstLocation = trip[0];
                        const totalCost = trip.reduce((sum, place) => sum + (parseFloat(place.cost) || 0), 0);

                        return (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gray-200 relative">
                                    {firstLocation?.image && (
                                        <img
                                            src={firstLocation.image}
                                            alt="Trip Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full flex justify-between items-end">
                                        <p className="text-white font-semibold">Saved on {new Date(item.created_at).toLocaleDateString()}</p>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-white hover:text-red-400 bg-black/40 hover:bg-black/60 p-2 rounded-full transition"
                                            title="Delete Itinerary"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                            {trip.length} Stops
                                        </span>
                                        <span className="text-gray-600 font-medium">Rs {totalCost.toLocaleString()}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {trip.slice(0, 3).map((place, idx) => (
                                            <p key={idx} className="text-sm text-gray-700 truncate">• {place.name}</p>
                                        ))}
                                        {trip.length > 3 && <p className="text-xs text-gray-500">+ {trip.length - 3} more</p>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyItineraries;
