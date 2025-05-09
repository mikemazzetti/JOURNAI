import React from "react";
import PromptDisplay from "./PromptDisplay"; // Import the PromptDisplay component

// Simple TextArea 
const TextArea = ({
  value,
  onChange,
  placeholder,
  className = "",
  rows = 6,
  ...props
}) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Simple Button 
const Button = ({
  onClick,
  children,
  className = "",
  disabled = false,
  variant = "default",
}) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
  const variants = {
    default:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

function JournalEditor({
  journalText,
  onTextChange,
  suggestedPrompt,
  onGetPrompt,
  onSaveEntry,
  isLoadingPrompt,
  hasApiKey, // Pass down apiKey 
}) {
  const handleTextChange = (e) => {
    onTextChange(e.target.value); // Pass the new text up to App 
  };

  return (
    <div className="mb-4">
      {/* Journal Entry */}
      <div className="mb-4">
        <label
          htmlFor="journalEntry"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Today's thoughts:
        </label>
        <TextArea
          id="journalEntry"
          value={journalText}
          onChange={handleTextChange}
          placeholder="Start writing your journal entry here..."
          className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          rows={10} // Increased rows
          disabled={isLoadingPrompt || !hasApiKey} // Disable if long loading or no API key
        />
      </div>

      {/* Display Suggested Prompt */}
      <PromptDisplay prompt={suggestedPrompt} />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button
          onClick={onGetPrompt}
          // Disable button 
          disabled={isLoadingPrompt || !hasApiKey || !journalText.trim()}
          variant="outline"
          className="w-full sm:w-auto"
        >
          {isLoadingPrompt ? "Getting Suggestion..." : "Suggest a Prompt"}
        </Button>
        <Button
          onClick={onSaveEntry}
          // Disable button 
          disabled={isLoadingPrompt || !journalText.trim()}
          variant="default"
          className="w-full sm:w-auto"
        >
          Save Entry
        </Button>
      </div>
    </div>
  );
}

export default JournalEditor;
