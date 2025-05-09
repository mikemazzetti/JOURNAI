import React from "react";
import EntryItem from "./EntryItem"; // Import the component for a single entry

function SavedEntriesList({ entries, onDeleteEntry }) {
  // Show message if no saved entries
  if (!entries || entries.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm mt-4">
        No saved journal entries yet.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">
        Saved Entries
      </h2>
      {/* Scrollable container for list */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 border-t pt-4">
        {/* Map over entries array and render EntryItem for each */}
        {entries.map((entry) => (
          <EntryItem
            key={entry.id} // Use the unique ID as key
            entry={entry}
            onDelete={onDeleteEntry} // Pass delete handler down
          />
        ))}
      </div>
    </div>
  );
}

export default SavedEntriesList;
