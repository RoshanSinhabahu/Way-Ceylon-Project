import React from "react";
import ResultItem from "./ResultItem";


function ResultList({ results, totalBudget }) {
  return (
    <div className="bg-gray-50 flex flex-col max-h-content min-h-screen pt-20 py-10 px-6 lg:px-20 justify-center align-center items-center">
      <h2 className="text-3xl font-semibold mb-12 text-center ">Suggested Itinerary</h2>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {results.map((place, idx) => (
          <div key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 30}>
            <ResultItem place={place} />
          </div>
        ))}
      </ul>
      <h3 className="text-black rounded-full text-center p-4 px-12 bg-white w-content text-xl mt-20 mb-10 font-semibold shadow-lg shadow-emerald-600/10">
        Total Estimated Budget (Per Person): ${totalBudget}
      </h3>
    </div>
  );
}

export default ResultList;
