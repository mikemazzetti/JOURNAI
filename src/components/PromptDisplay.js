import React from "react";

function PromptDisplay({ prompt }) {
  // Don't render anything if no prompt
  if (!prompt) {
    return null;
  }

  return (
    <div className="my-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md animate-fade-in">
      {/* Animate fade-in defined in index.css */}
      <p className="text-sm font-medium text-indigo-700 mb-1">
        Suggested Prompt:
      </p>
      <p className="text-sm text-indigo-800 italic">{prompt}</p>
    </div>
  );
}

export default PromptDisplay;
