import React from "react";
import ResultItem from "./ResultItem";


function ResultList({ results, totalBudget }) {
  return (
    <div className="flex flex-col max-h-content min-h-screen mt-8 py-10 px-6 lg:px-20 justify-center align-center items-center">
      <h2 className="text-3xl font-semibold mb-12 text-center ">Suggested Itinerary</h2>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {results.map((place, idx) => (
          <ResultItem key={idx} place={place} />
        ))}
      </ul>
      <h3 className="text-white rounded-full text-center p-4 px-12 bg-green-600/70 w-content text-xl mt-20 mb-10 font-semibold">
        Total Estimated Budget (Per Person): ${totalBudget}
      </h3>
    </div>
  );
}

export default ResultList;
