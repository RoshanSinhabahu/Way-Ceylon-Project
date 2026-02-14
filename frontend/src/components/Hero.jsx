import React, { useState, useEffect } from "react";
import Hero from "../img/Hero/hero.webp";

const HeroSection = ({ days, setDays, categories, setCategories, handleSubmit }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryOptions = [
    { label: "🏝️ Beach", value: "beach" },
    { label: "🎭 Culture", value: "culture" },
    { label: "🌿 Nature", value: "nature" },
    { label: "🏔️ Adventure", value: "adventure" },
  ];

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setCategories([...categories, value]);
    else setCategories(categories.filter((c) => c !== value));
  };

  return (
    <section className="relative w-screen h-screen flex justify-center items-center flex-col overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `url(${Hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${offset * 0.5}px)`, // Moves at half speed
          height: "120%", // Extra height to cover movement
          top: "-10%"    // Center the extra height
        }}
      ></div>

      <h1 className="mt-8 px-12 text-center text-white text-5xl p-1 font-semibold">
        Life’s for living. Make it count
      </h1>
      <div className="text-white text-base pb-6">Plan your trip with GoCeylon</div>

      <form
        id="input-form"
        onSubmit={handleSubmit}
        className="bg-black bg-white/90 flex lg:flex-row flex-col p-4 lg:rounded-full rounded-[48px] lg:w-1/2 w-3/4 items-center justify-between "
      >
        {/* Number of days */}
        <div className="flex gap-5 justify-center items-center">
          <label className="flex w-20 h-20 bg-emerald-600/20 rounded-full text-black font-semibold items-center justify-center">
            Days
          </label>

          <div className="flex items-center justify-between bg-white/90 border border-gray-200 shadow-sm rounded-full w-32 h-16 py-2 px-4 hover:bg-white hover:shadow-md transition">
            <button
              type="button"
              onClick={() => setDays((prev) => Math.max(1, prev - 1))}
              className="text-2xl text-gray-400 text-xl font-semibold hover:text-emerald-600 transition"
            >
              –
            </button>

            <input
              type="number"
              value={days}
              min={1}
              max={90}
              onChange={(e) => {
                const value = Math.max(1, Math.min(90, Number(e.target.value)));
                setDays(value);
              }}
              className="text-xl w-12 text-center text-gray-800 font-medium bg-transparent outline-none transition"
            />

            <button
              type="button"
              onClick={() => setDays((prev) => Math.min(90, prev + 1))}
              className="text-2xl text-gray-400 text-xl font-semibold hover:text-emerald-600 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Categories (slider) */}
        <div className="">
          <div className="flex lg:flex-wrap lg:flex-row flex-col lg:space-x-3 justify-between items-center gap-y-3">
            {categoryOptions.map((cat) => (
              <label
                key={cat.value}
                className={`flex items-center px-4 py-2 rounded-full border transition ${categories.includes(cat.value)
                  ? "bg-emerald-600 text-white border-emerald-100"
                  : "bg-white text-gray-600 border-gray-300 hover:text-black hover:shadow hover:scale-105 transition"
                  } cursor-pointer`}
              >
                <input
                  type="checkbox"
                  value={cat.value} // send backend-friendly value
                  checked={categories.includes(cat.value)}
                  onChange={handleCategoryChange}
                  className="hidden"
                />
                {cat.label} {/* show emoji + label */}
              </label>
            ))}
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <button
        form="input-form"
        type="submit"
        className="flex m-4 justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50/90 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-100 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-600 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group before:active:bg-black"
      >
        <svg
          className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
          viewBox="0 0 16 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            className="fill-gray-800 group-hover:fill-gray-800"
          ></path>
        </svg>
        Genarate Trip
      </button>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-130 transition-transform scale-125"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <style>
          {`
            @keyframes fadeSlideDown {
              0% { opacity: 0; transform: translateY(-10px); }
              50% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(10px); }
            }
          `}
        </style>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ animation: 'fadeSlideDown 2s infinite ease-in-out' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
