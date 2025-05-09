import React from "react";

function Prompt({ text }) {
  if (!text) return null;

  return (
    <div className="my-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md animate-fade-in">
      <p className="text-sm font-medium text-indigo-700 mb-1">
        Prompt:
      </p>
      <p className="text-sm text-indigo-800 italic">{text}</p>
    </div>
  );
}

export default Prompt;
