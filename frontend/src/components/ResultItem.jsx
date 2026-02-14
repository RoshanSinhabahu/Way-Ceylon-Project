import React from "react";
import { WiDaySunny, WiRain, WiCloud, WiSnow, WiThunderstorm } from "react-icons/wi";
import { FaClock, FaMoneyBillWave, FaCloudSun } from "react-icons/fa"; // Duration, Budget, Weather
import { MapPin } from "lucide-react";

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <WiDaySunny className="text-yellow-400" />;
    case "rain":
      return <WiRain className="text-blue-400" />;
    case "clouds":
      return <WiCloud className="text-gray-400" />;
    case "snow":
      return <WiSnow className="text-blue-200" />;
    case "thunderstorm":
      return <WiThunderstorm className="text-purple-400" />;
    default:
      return <WiDaySunny className="text-yellow-400" />; // fallback
  }
}

function ResultItem({ place, onLocationSelect }) {
  return (
    <li
      onClick={() => onLocationSelect(place)}
      className="hover:scale-105 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300  p-5 w-full max-w-sm mx-auto cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-gray-900">
        {place.dayStart === place.dayEnd
          ? `Day ${place.dayStart}: ${place.name}`
          : `Day ${place.dayStart}–${place.dayEnd}: ${place.name}`}
      </h3>

      {/* Info Icons */}
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-start text-gray-600 mb-3 gap-y-2">
          <div className="flex items-center gap-2">
            <FaClock className="text-yellow-500" />
            <span>{place.duration} {place.duration > 1 ? "days" : "day"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-500" />
            <span>Rs {place.cost}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCloudSun className="text-blue-400" />
            <span>{place.weather.avgTemp}</span>
          </div>
        </div>

        {/* Weather Condition */}
        <div className="-mt-10 ml-16 flex flex-col justify-center items-center">
          <div className="text-6xl">{getWeatherIcon(place.weather.condition)}</div>
          <span className="text-md font-semibold">{place.weather.condition}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-2 mb-4">{place.description}</p>

      {/* Action Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          const url = `https://www.google.com/maps?q=${place.lat},${place.lon}`;
          window.open(url, "_blank");
        }}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
      >
        <MapPin size={18} />
        View on Map
      </button>
    </li>
  );
}

export default ResultItem;
