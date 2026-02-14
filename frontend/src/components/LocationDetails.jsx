import React, { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Calendar, Banknote, CloudSun } from "lucide-react";
import { WiDaySunny, WiRain, WiCloud, WiSnow, WiThunderstorm } from "react-icons/wi";

function getWeatherIcon(condition) {
    if (!condition) return <WiDaySunny className="text-yellow-400 w-16 h-16" />;
    switch (condition.toLowerCase()) {
        case "sunny":
            return <WiDaySunny className="text-yellow-400 w-16 h-16" />;
        case "rain":
            return <WiRain className="text-blue-400 w-16 h-16" />;
        case "clouds":
            return <WiCloud className="text-gray-400 w-16 h-16" />;
        case "snow":
            return <WiSnow className="text-blue-200 w-16 h-16" />;
        case "thunderstorm":
            return <WiThunderstorm className="text-purple-400 w-16 h-16" />;
        default:
            return <WiDaySunny className="text-yellow-400 w-16 h-16" />;
    }
}

const LocationDetails = ({ place, onBack }) => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!place) return null;

    return (
        <div className="mt-12 min-h-screen bg-gray-50 py-10 px-6 lg:px-20 animate-fade-in">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-semibold mb-8 transition-colors duration-200"
            >
                <ArrowLeft size={20} />
                Back to Search Results
            </button>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto">
                {/* Hero Image Section */}
                <div className="relative h-96 w-full">
                    <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-8 text-white w-full">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-shadow-lg">
                                {place.name}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-200">
                                <MapPin size={18} />
                                <span className="text-lg">Location Details</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Place</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {place.description ||
                                    "Experience the unique charm of this location. Perfect for travelers looking to explore the hidden gems of Sri Lanka."}
                            </p>
                        </div>

                        {/* Additional dynamic info could go here */}
                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                            <h3 className="text-xl font-semibold text-emerald-800 mb-3">Highlights</h3>
                            <ul className="list-disc list-inside text-emerald-700 space-y-2">
                                <li>Scenic views and photography spots</li>
                                <li>Rich cultural and historical significance</li>
                                <li>Local cuisine and dining experiences nearby</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar / Info Panel */}
                    <div className="space-y-6">
                        {/* Quick Stats Card */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Details</h3>

                            <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="text-emerald-500" size={20} />
                                    <span>Duration</span>
                                </div>
                                <span className="font-semibold text-gray-900">{place.duration} {place.duration > 1 ? "Days" : "Day"}</span>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Banknote className="text-emerald-500" size={20} />
                                    <span>Estimated Cost</span>
                                </div>
                                <span className="font-semibold text-gray-900">Rs {place.cost}</span>
                            </div>

                            <div className="flex items-center justify-between py-3 last:border-0">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <CloudSun className="text-emerald-500" size={20} />
                                    <span>Avg. Temp</span>
                                </div>
                                <span className="font-semibold text-gray-900">{place.weather?.avgTemp || "N/A"}</span>
                            </div>
                        </div>

                        {/* Weather Card */}
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm text-center">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Current Conditions</h3>
                            <div className="flex flex-col items-center justify-center my-4">
                                {getWeatherIcon(place.weather?.condition)}
                                <span className="text-xl font-bold text-blue-900 mt-2 capitalize">{place.weather?.condition || "Sunny"}</span>
                            </div>
                            <p className="text-blue-700 text-sm">Great weather for exploring!</p>
                        </div>

                        {/* Map Button */}
                        <button
                            onClick={() => {
                                const url = `https://www.google.com/maps?q=${place.lat},${place.lon}`;
                                window.open(url, "_blank");
                            }}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-emerald-600/30 transform active:scale-95"
                        >
                            <MapPin size={20} />
                            View on Google Maps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationDetails;
