import React from "react";

function Loader() {
  return (
    <div className="flex flex-col h-screen flex justify-center items-center py-10 space-y-4">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-emerald-600"></div>
      <div className="text-emerald-600">Thinking...</div>
    </div>
  );
}

export default Loader;
