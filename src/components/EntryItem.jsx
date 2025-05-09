import React from "react";
import Button from "./common/Button.jsx";

function EntryItem({ entry, onDelete }) {
  if (!entry) return null;

  const delEntry = () => {
    const ok = window.confirm("Delete this entry?");
    if (ok) {
      onDelete(entry.id);
    }
  };

  return (
    <div className="p-3 border rounded-md bg-gray-50 relative group transition-shadow hover:shadow-sm">
      <p className="text-xs text-gray-500 mb-1">
        Saved: {entry.savedAt ? new Date(entry.savedAt).toLocaleString() : "Unknown"}
      </p>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{entry.text}</p>
      <Button
        onClick={delEntry}
        variant="secondary"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
        aria-label="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
}

export default EntryItem;
